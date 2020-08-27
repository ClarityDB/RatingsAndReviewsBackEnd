import React from 'react';
import axios from 'axios';

class Helpfulness extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      buttonHelpToggle: false,
      buttonReportToggle: false,
    };
  }

  handleHelpfulClick() {
    if (this.state.buttonHelpToggle === false) {
      axios({
        method: 'put',
        url: `http://localhost:3555/reviews/helpful/${this.props.id}`,
      })
        .then((res) => {
          this.setState({
            buttonHelpToggle: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  handleReportClick() {
    if (this.state.buttonReportToggle === false) {
      axios({
        method: 'put',
        url: `http://localhost:3555/reviews/report/${this.props.id}`,
      })
        .then((res) => {
          this.setState({
            buttonReportToggle: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="h6 my-auto font-weight-light text-muted">
            <small id="helpful">
              Helpful?
            </small>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm m-1 border-0"
            onClick={this.handleHelpfulClick.bind(this)}
            data-toggle="button"
            aria-pressed="false"
          >
            <small>
              <u id="yes">
                Yes
              </u>
            </small>
          </button>
          <div className="h6 my-auto font-weight-light text-muted">
            <small id="helpnumber">
              {`(${this.props.help})`}
            </small>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm m-1 border-0"
            onClick={this.handleReportClick.bind(this)}
            data-toggle="button"
            aria-pressed="false"
          >
            <small>
              <u id="report">
                Report
              </u>
            </small>
          </button>
        </div>
      </div>
    );
  }
}

export default Helpfulness;
