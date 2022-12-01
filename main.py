from datetime import datetime
import plotly.graph_objects as go
from dash import Dash, dcc, html, Input, Output
import plotly.express as px

import pandas as pd

df = px.data.stocks()
dates = px.data.stocks()["date"].items()
dates_list = [datetime.strptime(date[1], '%Y-%m-%d').date() for date in dates]
years = [date.year for date in dates_list]
df["year"] = years
uniqYears = list(dict.fromkeys([date.year for date in dates_list]))

app = Dash(__name__)

app.layout = html.Div([
    html.Br(),
    # TODO: side menu with dropwodn and checkboxes
    dcc.Dropdown(uniqYears, uniqYears[0], id='year-dropdown'),
    dcc.Graph(id='graph-with-dropdown'),
    dcc.Graph(id='pie'),
    dcc.Graph(id='sankey'),
])


@app.callback(
    Output('graph-with-dropdown', 'figure'),
    Output('pie', 'figure'),
    Output('sankey', 'figure'),
    Input('year-dropdown', 'value'))
def update_figure(selected_year):
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
    fig.add_trace(go.Bar( x=data["date"],
                         y=data["NFLX"]/10,
                         marker_color='rgba(124, 189, 255, 0.5)',
                          name="NTFLX devided by 10"
                         ))

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

    fig.add_trace(go.Scatter(x=data["date"], y=data["AAPL"],
                             mode='lines', name='Apple',))
    fig.add_trace(go.Scatter(x=data["date"], y=data["GOOG"],
                             mode='lines', name='Google',))
    fig.add_trace(go.Scatter(x=data["date"], y=data["FB"],
                             mode='lines', name='FB',))

    labels = ['AAPL', 'GOOG', 'FB']
    values = [data['AAPL'].sum(), data['GOOG'].sum(), data['FB'].sum()]
    fig2.add_trace(go.Pie(values=values, labels=labels, hole=.3))

    fig.update_layout(transition_duration=500)

    return fig, fig2, fig3


if __name__ == '__main__':
    app.run_server(debug=True)
