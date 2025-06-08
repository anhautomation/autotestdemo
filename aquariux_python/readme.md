# Accquisitions

pip install pytest playwright

playwright install

pip install pytest-html

pip install python-dotenv

pip install allure-pytest

# Py Env

python3 -m venv venv

source venv/bin/activate 

# Run

headless : pytest --alluredir=allure-results && allure generate allure-results -o allure-report --clean

headfull : pytest --headed --alluredir=allure-results && allure generate allure-results -o allure-report --clean