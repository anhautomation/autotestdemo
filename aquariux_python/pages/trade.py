from playwright.sync_api import Page

class TradePage:
    def __init__(self, page: Page):
        self.page = page
        self.one_click_trading_toggle_locator = "//*[@data-testid='toggle-oct']"
        self.one_click_trading_agree_locator = "//*[text()='Agree and continue']"
        self.one_click_trading_checked_locator = "//*[@data-testid='toggle-oct-checked']"
        self.buy_option_locator = "//*[@data-testid='trade-button-order-buy']"
        self.size_locator = "//*[@data-testid='trade-input-volume']"
        self.top_loss_price_locator = "//*[@data-testid='trade-input-stoploss-price']"
        self.top_loss_point_locator = "//*[@data-testid='trade-input-stoploss-points']"
        self.take_profit_price_locator = "//*[@data-testid='trade-input-takeprofit-price']"
        self.take_profit_point_locator = "//*[@data-testid='trade-input-takeprofit-points']"
        self.place_buy_order_locator = "//*[@data-testid='trade-button-order']"
        self.trade_confirm_locator = "//*[@data-testid='trade-confirmation-button-confirm']"

    def check_one_click_trading(self):
        if self.page.locator(self.one_click_trading_toggle_locator).is_enabled():
            self.page.locator(self.one_click_trading_toggle_locator).click()
        else:
            raise Exception("[One-Click Trading] toogle is disabled!")

    def click_one_click_trading_agree(self):
        if self.page.locator(self.one_click_trading_agree_locator).is_enabled():
            self.page.locator(self.one_click_trading_agree_locator).click()
        else:
            raise Exception("[One-Click Trading Agree and Continue] Popup is not visible!")
        
    def uncheck_one_click_trading(self):
        if self.page.locator(self.one_click_trading_checked_locator).is_enabled():
            self.page.locator(self.one_click_trading_checked_locator).click()
        else:
            raise Exception("[One-Click Trading] toogle is disabled!")

    def select_buy_option(self):
        if self.page.locator(self.buy_option_locator).is_enabled():
            self.page.locator(self.buy_option_locator).click()
        else:
            raise Exception("[Buy] button is disabled!")
        
    def input_size(self, size: str):
        self.page.locator(self.size_locator).fill(size)

    def input_stop_loss_price(self, stop_loss_price: str):
        self.page.locator(self.top_loss_price_locator).fill(stop_loss_price)

    def input_stop_loss_points(self, stop_loss_points: str):
        self.page.locator(self.top_loss_point_locator).fill(stop_loss_points)

    def input_take_profit_price(self, take_profit_price: str):
        self.page.locator(self.take_profit_price_locator).fill(take_profit_price)

    def input_take_profit_points(self, take_profit_points: str):
        self.page.locator(self.take_profit_point_locator).fill(take_profit_points)

    def click_place_buy_order(self):
        if self.page.locator(self.place_buy_order_locator).is_enabled():
            self.page.locator(self.place_buy_order_locator).click()
        else:
            raise Exception("[Place Buy Order] button is disabled!")
        
    def click_trade_confirm(self):
        self.page.locator(self.trade_confirm_locator).wait_for(state="visible")
        if self.page.locator(self.trade_confirm_locator).is_enabled():
            self.page.locator(self.trade_confirm_locator).click()
        else:
            raise Exception("[Trade Confirm] button is disabled!")