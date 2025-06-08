from pages.login import LoginPage
from config.load import AQUARIUX_LOGIN, USERNAME, PASSWORD

def test_login(page):
    aquariux = LoginPage(page)
    aquariux.navigate_to_login(AQUARIUX_LOGIN)
    aquariux.select_demo_account()
    aquariux.input_username(USERNAME)
    aquariux.input_password(PASSWORD)