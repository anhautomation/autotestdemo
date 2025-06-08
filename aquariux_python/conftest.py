import pytest
from playwright.sync_api import sync_playwright

def pytest_addoption(parser):
    parser.addoption(
        "--headed", action="store_true", default=False, help="Run browser in headed mode"
    )

@pytest.fixture(scope="session")
def playwright():
    with sync_playwright() as p:
        yield p

@pytest.fixture(scope="session")
def browser(pytestconfig, playwright):
    headless = not pytestconfig.getoption("--headed")
    browser = playwright.chromium.launch(headless=headless, slow_mo=300 if not headless else 0)
    yield browser
    browser.close()

@pytest.fixture(scope="function")
def page(browser):
    page = browser.new_page()
    yield page
    page.close()
