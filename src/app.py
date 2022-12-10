from datetime import datetime
import plotly.graph_objects as go
from dash import dcc, html, Input, Output, dash
import plotly.express as px
from flask import Flask

from data import get_content_provider

df = px.data.stocks()
dates = px.data.stocks()["date"].items()
dates_list = [datetime.strptime(date[1], '%Y-%m-%d').date() for date in dates]
years = [date.year for date in dates_list]
df["year"] = years
uniqYears = list(dict.fromkeys([date.year for date in dates_list]))

server = Flask(__name__)

app = dash.Dash(server=server)
client = get_content_provider()

app.layout = html.Div(style={'display': 'grid',
                             "grid-template-columns": "1fr 3fr",
                             "grid-template-rows": "1fr",
                             "grid-column-gap": "0px",
                             "grid-row-gap": "0px",
                             }, children=[
    html.Div(style={
        "background-color": "#a2a6a3",
    }, children=[
        html.Div(style={"margin": "5rem 2rem"}, children=[
            dcc.Dropdown(uniqYears, uniqYears[0], id='year-dropdown', clearable=False),
            dcc.Checklist(
                id="line-checklist",
                options=[
                    {'label': 'Apple', 'value': 'AAPL'},
                    {'label': 'Google', 'value': 'GOOG'},
                    {'label': 'Facebook', 'value': 'FB'},
                ],
                value=['AAPL'],
                inline=False
            )
        ])
    ]),
    html.Div([
        dcc.Graph(id='graph-with-dropdown'),
        dcc.Graph(id='pie'),
        dcc.Graph(id='sankey'),
    ])
])


@app.callback(
    Output('graph-with-dropdown', 'figure'),
    Output('pie', 'figure'),
    Output('sankey', 'figure'),
    Input('year-dropdown', 'value'),
    Input('line-checklist', 'value'))
def update_figure(selected_year, selected):
    data = df[df['year'] == selected_year]

    fig = go.Figure()
    fig2 = go.Figure()
    fig3 = go.Figure()

    # fig.add_trace(go.Bar(x=data["date"],
    #                      y=data["GOOG"],
    #                      marker_color='rgb(55, 83, 109)',
    #                     ))
    # fig.add_trace(go.Bar(x=data["date"],
    #                      y=data["AAPL"],
    #                      marker_color='rgb(26, 118, 255)'
    #                      ))
    #
    fig.add_trace(go.Bar(x=data["date"],
                         y=data["NFLX"] / 10,
                         marker_color='rgba(124, 189, 255, 0.5)',
                         name="NTFLX devided by 10"
                         ))

    names = {'AAPL': "Apple", 'GOOG': "Google", 'FB': "Facebook"}
    colors = {'AAPL': "#2a2b2a", 'GOOG': "#F4B400", 'FB': "#4267B2"}
    for item in selected:
        fig.add_trace(go.Scatter(x=data["date"], y=data[item],
                                 mode='lines', name=names.get(item) ))

    labels = ["AAPL", "GOOG", "FB"]

    values = [data['AAPL'].sum(), data['GOOG'].sum(), data['FB'].sum()]
    fig2.add_trace(go.Pie(values=values, labels=labels, hole=.3))


    # TODO: connect sankey to dropdown and checkboxes
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

    fig3.add_trace(sankey)

    fig.update_layout(transition_duration=500)

    return fig, fig2, fig3


if __name__ == '__main__':
    app.run_server(debug=True)
