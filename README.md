# Plotly analysis tool for heat pump and solars

#### Work in VENV

1. python3 -m venv env
2. source venv/bin/activate
3. update dep from remote: python3 -m pip install -r requirements.txt
4. update dep for pridani -> pip freeze > requirements.txt


#### Run app
1. Create .env file in root
2. Fill up credential for DB access
3. For local run -> root: python3 src/app.py
4. For Docker run:
   1. root: docker compose build
   2. root: docker compose up