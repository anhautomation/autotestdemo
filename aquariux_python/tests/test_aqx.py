from pages.login import LoginPage
from pages.trade import TradePage
from config.load import AQUARIUX_LOGIN, USERNAME, PASSWORD

def test_trade(page):
    aquariux = LoginPage(page)
    aquariux.navigate_to_login(AQUARIUX_LOGIN)
    aquariux.select_demo_account()
    aquariux.input_username(USERNAME)
    aquariux.input_password(PASSWORD)
    aquariux.click_sign_in()
    aquariux = TradePage(page)
    aquariux.select_buy_option()
    aquariux.input_size("0.1")
    aquariux.input_stop_loss_points("50")
    aquariux.input_take_profit_points("30")
    aquariux.click_place_buy_order()
    aquariux.click_trade_confirm()