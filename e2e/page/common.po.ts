import { Locator, Page, expect } from '@playwright/test';
import lunary from "lunary"
import OpenAI from "openai"
require('dotenv').config();
import { config } from "../helpers/constants"
import { setOrgPro } from "../utils/db"
import { monitorOpenAI } from "lunary/openai"

export class CommAction{
  readonly page: Page;
  
  constructor(page: Page) {
    this.page = page;
  }

  async openUrl(urlPath: string): Promise<void> {
    await this.page.goto(urlPath, { timeout: 90 * 1000 });
  }

  async clickMenu(menuName: string): Promise<void> {
    await this.page.waitForLoadState("networkidle")
    await this.page.getByRole('link', { name: menuName}).click();
  }

  async waitSomeSeconds(second: number): Promise<void> {
    await this.page.waitForTimeout(second*1000);
  }


  async clickTab(tabName: string): Promise<void> {
    await this.page.getByText(tabName).click();
  }

  async initLunaryOpenAI(projectId: string): Promise<void> {
    lunary.init({
      "appId": projectId, // Your unique app ID obtained from the dashboard
      "apiUrl": config.API_URL, // Optional: Use a custom endpoint if you're self-hosting (you can also set LUNARY_API_URL)
      "verbose": true // Optional: Enable verbose logging for debugging
    })
  }

  async openAI(email: string, userName:string): Promise<void> {
    const openai = monitorOpenAI(new OpenAI({ apiKey: config.OPENAI_API_KEY}))
    const result = await openai.chat.completions.create({
    model: "gpt-4o",
    temperature: 0.9,
    tags: ["chat", "support"],  // Optional: tags
    user: email,  // Optional: user ID
    userProps: { name: userName  },  // Optional: user properties
    messages: [
      { role: "system", content: "You are an helpful assistant" },
      { role: "user", content: "Hello friend" },
    ],
  })
  }
  async verifyThumbUpDownIsDisplayedOnBanner(): Promise<void> {
    await expect(this.page.locator("//*[contains(@class,'thumb-up')and contains(@fill,'color-gray')]").first()).toBeVisible()
    await expect(this.page.locator("//*[contains(@class,'thumb-down') and contains(@fill,'color-gray')]").first()).toBeVisible()
  }

  async clickMessage(message: string): Promise<void> {
    await this.page.getByText(message).click();
  }

  async clickThumbUpIcon(): Promise<void> {
    await this.page.locator("//*[contains(@class,'thumb-up')and contains(@fill,'color-gray')]").last().click()
  }

  async clickMessageIcon(): Promise<void> {
    await this.page.locator("//*[contains(@class,'tabler-icon-message') and contains(@stroke,'gray')]").click()
  }

  async sendComment(content:string): Promise<void> {
    await this.page.getByPlaceholder('Add a comment').fill(content);
    await this.page.locator('[role="dialog"] span.mantine-Button-label').filter({hasText: 'Save'}).click();
  }

  async hoverCommentIcon(message:string): Promise<void> {
    await this.page.locator("table tr").filter({hasText: message})
      .locator(`//*[contains(@fill,'color-teal-5')]`).hover();
  }

  async verifyCommentIsDisplayed(message:string, content:string): Promise<void> {
    expect(await this.page.locator('div.mantine-Tooltip-tooltip').innerText()).toContain(content);
  }

  async verifyThumbUpIconTurnGreen(): Promise<void> {
    await expect(this.page.locator("//*[contains(@class,'thumb-up') and contains(@fill,'color-green')]").last()).toBeVisible()
  }

  async verifyThumbDownIconTurnRed(): Promise<void> {
    await expect(this.page.locator("//*[contains(@class,'thumb-down') and contains(@fill,'color-red')]").last()).toBeVisible()
  }

  async verifyThumbUpIconIsDisplayed(message:string): Promise<void> {
    await expect(this.page.locator("table tr").filter({hasText: message})
      .locator(`//*[contains(@class,'thumb-up') and contains(@fill,'color-green')]`)).toBeVisible();
  }

  async verifyThumbDownIconIsDisplayed(message:string): Promise<void> {
    await expect(this.page.locator("table tr").filter({hasText: message})
    .locator(`//*[contains(@class,'thumb-down') and contains(@fill,'color-red')]`)).toBeVisible();
  }

  async clickThumbDownIcon(): Promise<void> {
    await this.page.locator("//*[contains(@class,'thumb-down')and contains(@fill,'color-gray')]").last().click()
  }
  
}