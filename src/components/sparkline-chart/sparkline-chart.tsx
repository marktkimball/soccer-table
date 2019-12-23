import React from 'react';
import './sparkline-chart.css';

type SparklineChartProps = {
  height: number;
  hoverLineColor: string;
  maxPoints: number[];
  maxPointsColor: string;
  teamPoints: number[];
  teamPointsColor: string;
  width: number;
};

type SparklineChartState = {
  currentMaxPointValue: number;
  currentTeamPointValue: number;
  hFactor: number;
  max: number;
  min: number;
  vFactor: number;
  xHoverIndex: number;
};

export class SparklineChart extends React.Component<
  SparklineChartProps,
  SparklineChartState
> {
  state = {
    currentMaxPointValue: 0,
    currentTeamPointValue: 0,
    hFactor: 0,
    max: 0,
    min: 0,
    vFactor: 0,
    xHoverIndex: 0,
  };

  componentDidMount() {
    const { height, maxPoints, width } = this.props;
    const max = maxPoints[0] + 1;
    const min = -1;
    const length = maxPoints.length;
    const vFactor = height / (max - min || 2);
    const hFactor = width / (length - (length > 1 ? 1 : 0));

    this.setState({
      hFactor,
      max,
      min,
      vFactor,
    });
  }

  dataToPoints = (data: number[]) => {
    const { hFactor, max, min, vFactor } = this.state;

    return data.map((d, i) => ({
      x: i * hFactor,
      y: (max === min ? 1 : max - d) * vFactor,
    }));
  };

  onMouseMove = (event: React.MouseEvent<SVGElement>) => {
    const { hFactor } = this.state;
    const e = event.currentTarget;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const xIndex = Math.round(x / hFactor);

    this.setState({
      currentMaxPointValue: this.props.maxPoints[xIndex],
      currentTeamPointValue: this.props.teamPoints[xIndex],
      xHoverIndex: xIndex * hFactor,
    });
  };

  render() {
    const {
      height,
      hoverLineColor,
      maxPoints,
      maxPointsColor,
      teamPoints,
      teamPointsColor,
      width,
    } = this.props;
    const { xHoverIndex } = this.state;

    const maxData = this.dataToPoints(maxPoints);
    const teamData = this.dataToPoints(teamPoints);
    const maxLinePoints = maxData
      .map(p => [p.x, p.y])
      .reduce((a, b) => a.concat(b));
    const teamLinePoints = teamData
      .map(p => [p.x, p.y])
      .reduce((a, b) => a.concat(b));
    const maxClosePolyPoints = [
      maxData[maxData.length - 1].x,
      height,
      0,
      height,
      0,
      maxData[0].y,
    ];
    const teamClosePolyPoints = [
      teamData[teamData.length - 1].x,
      height,
      0,
      height,
      0,
      teamData[0].y,
    ];
    const maxLineFillPoints = maxLinePoints.concat(maxClosePolyPoints);
    const teamLineFillPoints = teamLinePoints.concat(teamClosePolyPoints);

    const maxFillStyle: React.CSSProperties = {
      fill: maxPointsColor || 'slategray',
      fillOpacity: 0.1,
      pointerEvents: 'auto',
      stroke: 'none',
      strokeWidth: '0',
    };
    const teamFillStyle: React.CSSProperties = {
      ...maxFillStyle,
      fill: teamPointsColor || 'slategray',
    };

    const maxLineStyle: React.CSSProperties = {
      fill: 'none',
      stroke: maxPointsColor || 'slategray',
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: '2',
    };
    const teamLineStyle: React.CSSProperties = {
      ...maxLineStyle,
      stroke: teamPointsColor || 'slategray',
    };

    return (
      <div className="chart-container">
        <svg
          onMouseMove={this.onMouseMove}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
        >
          <g>
            {xHoverIndex && (
              <line
                style={{ stroke: hoverLineColor, strokeWidth: 2 }}
                x1={xHoverIndex}
                x2={xHoverIndex}
                y1="0"
                y2={height}
              ></line>
            )}
            <polyline
              points={maxLineFillPoints.join(' ')}
              style={maxFillStyle}
            />
            <polyline
              id="max-line"
              points={maxLinePoints.join(' ')}
              style={maxLineStyle}
            />
            <polyline
              points={teamLineFillPoints.join(' ')}
              style={teamFillStyle}
            />
            <polyline
              ref="team"
              points={teamLinePoints.join(' ')}
              style={teamLineStyle}
            />
          </g>
        </svg>
        <div className="sparkline-stats">
          <p className="sparkline-stat-item">
            Matchday:{' '}
            <span>
              {Math.round(this.state.xHoverIndex / this.state.hFactor) + 1}
            </span>
          </p>
          <p className="sparkline-stat-item">
            Maximum possible points:{' '}
            <span>{this.state.currentMaxPointValue}</span>
          </p>
          <p className="sparkline-stat-item">
            Team points: <span>{this.state.currentTeamPointValue}</span>
          </p>
        </div>
      </div>
    );
  }
}
