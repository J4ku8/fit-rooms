from dash import Dash, dcc, html, Input, Output
from plotly.subplots import make_subplots
import plotly.graph_objects as go
import plotly.express as px
import plotly.io as pio
import json, urllib

# from influxdb_client import InfluxDBClient
#
# client = InfluxDBClient(host='https://10.38.5.125', port=4201, username='influx', password='influx2021', ssl=True, verify_ssl=True)

app = Dash(__name__)

pio.renderers.default = "chrome"

pio.templates.default = "seaborn"

df = px.data

print(df.tips())

print(px.data.wind()['strength'].unique())

scatter = go.Scatter(y=px.data.wind()['frequency'], mode="lines")
pieChart = go.Pie(values=[2, 3, 1], hole=.3)
histogram = go.Histogram(x=df.tips()['day'])
sankey = go.Sankey(
    arrangement="snap",
    node=dict(
        label=["A", "B", "C"],
        x=[0, 0, 2],
        y=[2, 4, 0],
        color=["lemonchiffon", "paleturquoise", "ghostwhite"],
        pad=10),  # 10 Pixels
    link=dict(
        source=[0, 1],
        target=[2, 2],
        value=[1, 2]))

fig = make_subplots(
    rows=2, cols=2,
    specs=[[{"type": "sankey"}, {"type": "histogram"}],
           [{"type": "domain"}, {"type": "scatter"}]],
)

fig.add_trace(sankey, row=1, col=1)
fig.add_trace(histogram, row=1, col=2)
fig.add_trace(pieChart, row=2, col=1)
fig.add_trace(scatter, row=2, col=2)
fig.update_layout(height=700, showlegend=False)
fig.show()

app.layout = html.Div([
    html.Div(id='output_container', children=[
        html.Div(
            children=[html.H1("Regulus heater dada analysis", style={'text-align': 'center'}, className='title'),
                      html.Div([
                          html.P('Select Month',
                                 className='drop_down_list_title'
                                 ),
                          dcc.Dropdown(id='select_month',
                                       multi=False,
                                       clearable=True,
                                       disabled=False,
                                       style={'display': True},
                                       value='Mar',
                                       placeholder='Select Month',
                                       options=[{'label': c, 'value': c}
                                                for c in ['January', 'February', 'April']],
                                       className='drop_down_list'),
                      ], className='title_drop_down_list'),
                      html.Br(),
                      dcc.Graph(figure=fig)
                      ]
        )
    ]),
])

if __name__ == '__main__':
    app.run_server(debug=False)
    # print(client.ping())
