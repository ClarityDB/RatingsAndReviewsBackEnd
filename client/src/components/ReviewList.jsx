import React from 'react';

import IndividualReview from './IndividualReview';
import AddReview from './AddReview';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviewListData: [],
      currentList: [],
      sortValue: this.props.sortValue,
      currentProduct: this.props.currentProduct,
    };
  }

  componentDidMount() {
    // FIND WAY TO GRAB CURRENT PRODUCT ID TO PASS
    this.setReviewListData();
    if (this.state.reviewListData.length > 0) {
      this.grabTwoReviews();
    }
  }

  componentDidUpdate() {
    // console.log('state at time of ReviewList component update: ', this.state);
    if (this.state.currentList.length === 0) {
      this.setReviewListData();
      if (this.state.reviewListData.length > 0) {
        this.grabTwoReviews();
      }
    }
  }

  setReviewListData() {
    if (this.props.reviews.length > 0) {
      this.setState({
        reviewListData: this.props.reviews,
      });
    }
  }

  grabTwoReviews() {
    if (this.state.currentList.length === 0) {
      const firstTwo = this.state.reviewListData.slice(0, 2);
      this.setState({
        currentList: firstTwo,
      });
    } else {
      // grab current length n and offset next slice by n
      const n = this.state.currentList.length;
      const nextTwo = this.state.reviewListData.slice(n, n + 2);
      this.setState({
        currentList: this.state.currentList.concat(nextTwo),
      });
    }
  }

  handleMoreReviewClick() {
    this.grabTwoReviews();
  }

  handleSortOptionClick(event) {
    // Grab the link
    // console.log('Grabbing event', typeof event.target.innerText);
    const sort = event.target.innerText;
    this.setState({
      sortValue: sort,
      currentList: [],
      reviewListData: this.props.reviews,
    }, () => {
      this.props.apiRequest(this.state.currentProduct, sort);
    });
  }

  render() {
    console.log("current List in reviewList: ", this.state.currentList);
    return (
      <div className="container" style={{ height: 600 }}>
        <div className="row">
          <div id="totalreviews" className="h5 my-auto">
            {this.state.reviewListData.length}
            {' '}
            Reviews, sorted by
          </div>
          <div className="btn-group dropdown px-2">
            <button
              className="btn btn-outline-secondary btn-sm dropdown-toggle"
              type="button"
              id="dropdownMenu2"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              {this.state.sortValue}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenu2">
              <button type="button" className="dropdown-item" onClick={this.handleSortOptionClick.bind(this)}>newest</button>
              <button type="button" className="dropdown-item" onClick={this.handleSortOptionClick.bind(this)}>helpful</button>
              <button type="button" className="dropdown-item" onClick={this.handleSortOptionClick.bind(this)}>relevant</button>
            </div>
          </div>
        </div>
        <div id="individualreviews" className="row align-self-center mh-100 mw-100" style={{ overflow: 'scroll' }}>
          <div className="mh-100 mw-100">
            {this.state.currentList.map((review) => (
              <IndividualReview
                rating={review.rating}
                name={review.reviewer_name}
                date={review.date}
                title={review.summary}
                body={review.body}
                help={review.helpfulness}
                id={review.id}
                response={review.response}
                photos={review.photos}
                key={review.id}
              />
            ))}
          </div>
        </div>
        <div id="buttons" className="row align-self-center">
          {(this.state.currentList.length < this.state.reviewListData.length)
            ? (
              <div className="col">
                <button
                  type="button"
                  className="order-first btn btn-outline-secondary mw-75"
                  onClick={this.handleMoreReviewClick.bind(this)}
                >
                  More Reviews
                </button>
              </div>
            )
            : null}
          <div className="col">
            <button
              type="button"
              className="order-last btn btn-outline-secondary mw-75"
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              Add a Review
            </button>
            {/* Modal */}
            <div className="modal fade" id="staticBackdrop" data-backdrop="static" data-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Write Your Review</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <AddReview id={this.state.currentProduct} characteristics={this.props.metaData} />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewList;
