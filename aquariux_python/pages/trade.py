import allure
from playwright.sync_api import Page

class TradePage:
    def __init__(self, page: Page):
        self.page = page
        # trading side
        self.one_click_trading_toggle_locator = "//*[@data-testid='toggle-oct']"
        self.one_click_trading_agree_locator = "//*[text()='Agree and continue']"
        self.one_click_trading_checked_locator = "//*[@data-testid='toggle-oct-checked']"
        self.buy_option_locator = "//*[@data-testid='trade-button-order-buy']"
        self.size_locator = "//*[@data-testid='trade-input-volume']"
        self.price_locator = "//*[@data-testid='trade-input-price']"
        self.top_loss_price_locator = "//*[@data-testid='trade-input-stoploss-price']"
        self.top_loss_point_locator = "//*[@data-testid='trade-input-stoploss-points']"
        self.take_profit_price_locator = "//*[@data-testid='trade-input-takeprofit-price']"
        self.take_profit_point_locator = "//*[@data-testid='trade-input-takeprofit-points']"
        self.place_buy_order_locator = "//*[@data-testid='trade-button-order']"
        self.trade_confirm_locator = "//*[@data-testid='trade-confirmation-button-confirm']"
        self.order_type_locator = "//*[@data-testid='trade-dropdown-order-type']"
        # open positions
        self.open_position_locator = "//*[@data-testid='tab-asset-order-type-open-positions']"
        self.asset_open_list_locator = "//*[@data-testid='asset-open-list']"
        # pending orders
        self.pending_orders_locator = "//*[@data-testid='tab-asset-order-type-pending-orders']"
        self.asset_pending_list_locator = "//*[@data-testid='asset-pending-list']"
        # asset item actions
        self.asset_item_edit_locator = "//*[@data-testid='asset-open-button-edit']"
        self.asset_item_close_locator = "//*[@data-testid='asset-open-button-close']"
        #notification
        self.notification_locator = "//*[@data-testid='notification-selector']"
        self.notification_list_locator = "//*[@data-testid='notification-list-result']"
        self.notification_list_result_locator = "//*[@data-testid='notification-list-result-item']"

    def refresh_page(self):
        self.page.reload()

    @allure.step("Check [One-Click Trading] toggle")
    def check_one_click_trading(self):
        if self.page.locator(self.one_click_trading_toggle_locator).is_enabled():
            self.page.locator(self.one_click_trading_toggle_locator).click()
        else:
            raise Exception("[One-Click Trading] toogle is disabled!")

    @allure.step("Click [Agree and continue] button")
    def click_one_click_trading_agree(self):
        if self.page.locator(self.one_click_trading_agree_locator).is_enabled():
            self.page.locator(self.one_click_trading_agree_locator).click()
        else:
            raise Exception("[One-Click Trading Agree and Continue] Popup is not visible!")
        
    @allure.step("Uncheck [One-Click Trading] toggle")
    def uncheck_one_click_trading(self):
        if self.page.locator(self.one_click_trading_checked_locator).is_enabled():
            self.page.locator(self.one_click_trading_checked_locator).click()
        else:
            raise Exception("[One-Click Trading] toogle is disabled!")

    @allure.step("Click [Buy] button")
    def select_buy_option(self):
        if self.page.locator(self.buy_option_locator).is_enabled():
            self.page.locator(self.buy_option_locator).click()
        else:
            raise Exception("[Buy] button is disabled!")
        
    @allure.step("Select [Order Type] {market_type}")
    def select_order_type(self, market_type: str):
        if self.page.locator(self.order_type_locator).is_enabled():
            self.page.locator(self.order_type_locator).click()
        else:
            raise Exception("[Order Type] drop down list is disabled!")
        self.order_type_market = f"//*[text()='{market_type}' and contains(@data-testid,'trade-dropdown-order-type')]"
        if self.page.locator(self.order_type_market).is_enabled():
            self.page.locator(self.order_type_market).click()
        else:
            raise Exception("[Order Market Type] is not visible!")

    @allure.step("Input [Size] {size}")
    def input_size(self, size: str):
        self.page.locator(self.size_locator).fill(size)

    @allure.step("Input [Price] {price}")
    def input_price(self, price: str):
        self.page.locator(self.price_locator).fill(price)

    @allure.step("Input [Stop Loss Price] {stop_loss_price}")
    def input_stop_loss_price(self, stop_loss_price: str):
        self.page.locator(self.top_loss_price_locator).fill(stop_loss_price)

    @allure.step("Input [Stop Loss Points] {stop_loss_points}")
    def input_stop_loss_points(self, stop_loss_points: str):
        self.page.locator(self.top_loss_point_locator).fill(stop_loss_points)

    @allure.step("Input [Take Profit Price] {take_profit_price}")
    def input_take_profit_price(self, take_profit_price: str):
        self.page.locator(self.take_profit_price_locator).fill(take_profit_price)

    @allure.step("Input [Take Profit Points] {take_profit_points}")
    def input_take_profit_points(self, take_profit_points: str):
        self.page.locator(self.take_profit_point_locator).fill(take_profit_points)

    @allure.step("Click [Place Buy Order]")
    def click_place_buy_order(self):
        if self.page.locator(self.place_buy_order_locator).is_enabled():
            self.page.locator(self.place_buy_order_locator).click()
        else:
            raise Exception("[Place Buy Order] button is disabled!")
        
    @allure.step("Click [Confirm] button")
    def click_trade_confirm(self):
        self.page.locator(self.trade_confirm_locator).wait_for(state="visible")
        if self.page.locator(self.trade_confirm_locator).is_enabled():
            self.page.locator(self.trade_confirm_locator).click()
        else:
            raise Exception("[Trade Confirm] button is disabled!")
        
    @allure.step("Click [Open Position] tab")
    def click_open_position(self):
        if self.page.locator(self.open_position_locator).is_enabled():
            self.page.locator(self.open_position_locator).click()
        else:
            raise Exception("[Open Position] tab is disabled!")
        
    @allure.step("Click [Edit] button of open asset {asset_item}")
    def edit_open_asset_item(self, asset_item: int):
        self.item_edit = f"{self.asset_open_list}//tr[{asset_item}]{self.asset_item_edit_locator}"
        if self.page.locator(self.item_edit).is_enabled():
            self.page.locator(self.item_edit).click()
        else:
            raise Exception("[Edit] button is disabled!")
        
    @allure.step("Click [Close] button of open asset {asset_item}")
    def close_open_asset_item(self, asset_item: int):
        self.item_close = f"{self.asset_open_list}//tr[{asset_item}]{self.asset_item_close_locator}"
        if self.page.locator(self.item_close).is_enabled():
            self.page.locator(self.item_close).click()
        else:
            raise Exception("[Close] button is disabled!")
        
    @allure.step("Click [Pending Order] tab")
    def click_pending_order(self):
        if self.page.locator(self.pending_orders_locator).is_enabled():
            self.page.locator(self.pending_orders_locator).click()
        else:
            raise Exception("[Pending Order] tab is disabled!")

    @allure.step("Click [Edit] button of pending asset {asset_item}")
    def edit_pending_asset_item(self, asset_item: int):
        self.item_edit = f"{self.pending_orders_locator}//tr[{asset_item}]{self.asset_item_edit_locator}"
        if self.page.locator(self.item_edit).is_enabled():
            self.page.locator(self.item_edit).click()
        else:
            raise Exception("[Edit] button is disabled!")

    @allure.step("Click [Close] button of pending asset {asset_item}")    
    def close_pending_asset_item(self, asset_item: int):
        self.item_close = f"{self.pending_orders_locator}//tr[{asset_item}]{self.asset_item_close_locator}"
        if self.page.locator(self.item_close).is_enabled():
            self.page.locator(self.item_close).click()
        else:
            raise Exception("[Close] button is disabled!")

    @allure.step("Click [Notification] icon")
    def click_notification(self):
        if self.page.locator(self.notification_locator).is_enabled():
            self.page.locator(self.notification_locator).click()
            self.page.locator(self.notification_list_result_locator).first.wait_for(state="visible")
        else:
            raise Exception("[Notification] button is disabled!")