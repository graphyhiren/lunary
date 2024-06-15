import { checkAccess } from "@/src/utils/authorization"
import sql from "@/src/utils/db"
import { clearUndefined } from "@/src/utils/ingest"
import Context from "@/src/utils/koa"
import { unCamelObject } from "@/src/utils/misc"
import Router from "koa-router"

const templates = new Router({
  prefix: "/templates",
})

templates.get("/", async (ctx: Context) => {
  const getOnlyLiveVersions = ctx.query.onlyLiveVersions === "true"

  const tableToJoin = getOnlyLiveVersions
    ? sql("latest_template_versions")
    : sql("template_version")

  const templates = await sql`
    with latest_template_versions as (
      select distinct on (tv.template_id)
        tv.*
      from
        template_version tv
      where
        tv.is_draft = FALSE
      order by
        tv.template_id,
        tv.created_at desc
    )
    select
      t.*,
      json_agg(tv.*) as versions
    from
      template t
      left join ${tableToJoin} tv on t.id = tv.template_id
    where
      project_id = ${ctx.state.projectId} 
      and tv.id is not null
    group by
      t.id; 
  `

  // uncamel each template's versions' extras' keys
  for (const template of templates) {
    for (const version of template.versions) {
      version.extra = unCamelObject(version.extra)
    }
  }

  ctx.body = templates
})

// insert template + a first version, and return the template with versions
templates.post("/", checkAccess("prompts", "create"), async (ctx: Context) => {
  const { projectId, userId } = ctx.state

  const { slug, mode, content, extra, testValues, isDraft, notes } = ctx.request
    .body as {
    slug: string
    mode: string
    content: any[]
    extra: any
    testValues: any
    isDraft: boolean
    notes: string
  }

  const [template] = await sql`
    insert into template ${sql({
      projectId,
      ownerId: userId,
      slug,
      mode,
    })} returning *
  `

  const [templateVersion] = await sql`
    insert into template_version ${sql(
      clearUndefined({
        templateId: template.id,
        content: sql.json(content),
        extra: sql.json(unCamelObject(extra)),
        testValues: sql.json(testValues),
        isDraft: isDraft,
        notes,
      }),
    )} returning *
  `

  ctx.body = {
    ...template,
    versions: [templateVersion],
  }
})

templates.get("/:id", async (ctx: Context) => {
  const [row] = await sql`
    select * from template where project_id = ${ctx.state.projectId} and id = ${ctx.params.id}
  `

  ctx.body = row
})

templates.delete(
  "/:id",
  checkAccess("prompts", "delete"),
  async (ctx: Context) => {
    await sql`
    delete from template where project_id = ${ctx.state.projectId} and id = ${ctx.params.id}
  `

    ctx.status = 204
  },
)

templates.patch(
  "/:id",
  checkAccess("prompts", "update"),
  async (ctx: Context) => {
    const { slug, mode } = ctx.request.body as {
      slug: string
      mode: string
    }

    const [template] = await sql`
    update template set
      slug = ${slug},
      mode = ${mode}
    where project_id = ${ctx.state.projectId} and id = ${ctx.params.id}
    returning *
  `

    const versions = await sql`
    select * from template_version where template_id = ${ctx.params.id}
  `

    for (const version of versions) {
      version.extra = unCamelObject(version.extra)
    }

    ctx.body = {
      ...template,
      versions,
    }
  },
)

templates.post(
  "/:id/versions",
  checkAccess("prompts", "update"),
  async (ctx: Context) => {
    const { content, extra, testValues, isDraft, notes } = ctx.request.body as {
      content: any[]
      extra: any
      testValues: any
      isDraft: boolean
      notes: string
    }

    const [templateVersion] = await sql`
    insert into template_version ${sql(
      clearUndefined({
        templateId: ctx.params.id,
        content: sql.json(content),
        extra: sql.json(unCamelObject(extra)),
        test_values: sql.json(testValues),
        isDraft,
        notes,
      }),
    )} returning *
  `

    ctx.body = templateVersion
  },
)

export default templates
