import allure
from playwright.sync_api import Page

class LoginPage:
    def __init__(self, page: Page):
        self.page = page
        self.live_account_option_locator = "//*[text()='Live Account']"
        self.demo_account_option_locator = "//*[text()='Demo Account']"
        self.username_locator = "//*[@data-testid='login-user-id']"
        self.password_locator = "//*[@data-testid='login-password']"
        self.sign_in_locator = "//*[@data-testid='login-submit']"

    @allure.step("Navigate to login url {login_url}")
    def navigate_to_login(self, login_url: str):
        self.page.goto(login_url)

    @allure.step("Select demo account")
    def select_demo_account(self):
        if self.page.locator(self.demo_account_option_locator).is_enabled():
            self.page.locator(self.demo_account_option_locator).click()
        else:
            raise Exception("Login button is disabled!")

    @allure.step("Input username {username}")
    def input_username(self, username: str):
        self.page.locator(self.username_locator).fill(username)

    @allure.step("Input password *******")
    def input_password(self, password: str):
        self.page.locator(self.password_locator).fill(password)

    @allure.step("Click [Sign in]")
    def click_sign_in(self):
        if self.page.locator(self.sign_in_locator).is_enabled():
            self.page.locator(self.sign_in_locator).click()
        else:
            raise Exception("Login button is disabled!")