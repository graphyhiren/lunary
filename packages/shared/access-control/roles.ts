export type ResourceName =
  | "project"
  | "billing"
  | "teamMembers"
  | "apiKeys"
  | "analytics"
  | "logs"
  | "users"
  | "prompts"
  | "radars"
  | "datasets"
  | "checkLists"
  | "evaluations"
export type Role = "owner" | "admin" | "member" | "viewer" | "billing"
export type Action =
  | "create"
  | "read"
  | "update"
  | "delete"
  | "list"
  | "export"
  | "run"

export const roles: Record<
  Role,
  {
    value: Role
    name: string
    description: string
    permissions: Record<ResourceName, Partial<Record<Action, boolean>>>
  }
> = {
  owner: {
    value: "owner",
    name: "Owner",
    description: "Owner of the organization",
    permissions: {
      project: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      billing: {
        read: true,
        update: true,
      },
      teamMembers: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      apiKeys: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      analytics: { read: true },
      logs: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        export: true,
      },
      users: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        export: true,
      },
      prompts: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
      radars: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      datasets: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      checkLists: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      evaluations: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
    },
  },
  admin: {
    value: "admin",
    name: "Admin",
    description: "Admin-level access to the entire org",
    permissions: {
      project: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      billing: {
        update: true,
      },
      teamMembers: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      apiKeys: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      analytics: { read: true },
      logs: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        export: true,
      },
      users: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        export: true,
      },
      prompts: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
      radars: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      datasets: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      checkLists: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      evaluations: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
    },
  },
  member: {
    value: "member",
    name: "Member",
    description: "Full access to most resources",
    permissions: {
      project: {
        create: true,
        read: true,
        update: true,
        delete: false,
        list: true,
      },
      teamMembers: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      apiKeys: {
        create: true,
        read: true,
        update: true,
        delete: false,
        list: true,
      },
      analytics: { read: true },
      logs: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        export: true,
      },
      users: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
        export: true,
      },
      prompts: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
      radars: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      datasets: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      checkLists: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
      },
      evaluations: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
    },
  },
  viewer: {
    value: "viewer",
    name: "Viewer",
    description: "View-only access to most resources",
    permissions: {
      project: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      teamMembers: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      apiKeys: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      analytics: { read: true },
      logs: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
        export: false,
      },
      users: { read: true },
      prompts: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
        run: false,
      },
      radars: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      datasets: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      checkLists: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
      evaluations: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
        run: false,
      },
    },
  },
  prompt_editor: {
    value: "prompt_editor",
    name: "Prompt Editor",
    description: "Access limited to prompt management",
    permissions: {
      prompts: {
        create: true,
        read: true,
        update: true,
        delete: true,
        list: true,
        run: true,
      },
    },
  },
  billing: {
    value: "billing",
    name: "Billing",
    description: "Manage billing settings and invoices",
    permissions: {
      billing: {
        create: false,
        read: true,
        update: false,
        delete: false,
        list: true,
      },
    },
  },
}

export function hasReadAccess(
  userRole: Role,
  resourceName: ResourceName,
): boolean {
  try {
    return roles[userRole].permissions[resourceName].read || false
  } catch (error) {
    return false
  }
}

export function hasAccess(
  userRole: Role,
  resourceName: ResourceName,
  action: keyof (typeof roles)[Role]["permissions"][ResourceName],
) {
  try {
    return roles[userRole].permissions[resourceName][action]
  } catch (error) {
    return false
  }
}
