import React from 'react';
import 'bootstrap';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewList from './ReviewList';
import RatingSummary from './RatingSummary';

class ReviewParent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiDataAccessed: false,
      apiMetaAccessed: false,
      currentProduct: this.props.match.params.productId,
      stateSortValue: 'newest',
      apiReviews: [],
      apiMeta: {},
      characteristics: [],
    };
    // List of Reviews stored HERE
    // Review Metadata stored HERE
  }

  componentDidMount() {
    this.pullReviewData();
    this.pullMetaData();
  }

  pullReviewData(productID = this.state.currentProduct, sortValue = this.state.stateSortValue) {
    this.setState({
      apiDataAccessed: false,
    }, () => {
      // console.log('data access reset', this.state.apiDataAccessed);
    });
    axios.get(`http://localhost:3555/reviews/${productID}/list`, {
      params: {
        count: 30,
        sort: sortValue,
      },
    })
      .then((results) => {
        console.log("reviews/productID/list response: ", results);
        this.setState({
          apiReviews: results.data,
          apiDataAccessed: true,
          stateSortValue: sortValue,
        }, () => {
          // console.log('pulledReviewData, Reviews:', this.state.apiReviews);
          // console.log('pulledReviewData, sortValue:', this.state.stateSortValue);
          // console.log('pulledReviewData, dataccess value', this.state.apiDataAccessed);
          // console.log('review count check', results.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  pullMetaData(productID = this.state.currentProduct) {
    axios({
      method: 'get',
      url: `http://localhost:3555/reviews/${productID}/meta`,
      data: {
        product_id: productID,
      },
    })
      .then((results) => {
        // console.log("meta data api results from local host: ", results);
        this.setState({
          apiMeta: results.data,
          apiMetaAccessed: true,
        }, () => {
          // console.log('current meta data', this.state.apiMeta);
          this.prepCharacteristics(this.state.apiMeta.characteristics);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  prepCharacteristics(object) {
    this.setState({
      characteristics: Object.entries(object),
    }, () => {
      // console.log(this.state.characteristics);
    });
  }

  render() {
    return (
      <div className="m-5">
        <div id="reviewtitle" className="h6 font-weight-light text-muted">
          RATINGS & REVIEWS
        </div>
        <div className="container-fluid">
          <div className="row no-gutters">
            <div className="col--">
              {this.state.apiMetaAccessed
                ? <RatingSummary metaData={this.state.apiMeta} />
                : null}
            </div>
            <div className="col-8">
              {this.state.apiDataAccessed
                ? (
                  <ReviewList
                    reviews={this.state.apiReviews}
                    apiRequest={this.pullReviewData.bind(this)}
                    sortValue={this.state.stateSortValue}
                    currentProduct={this.state.currentProduct}
                    metaData={this.state.characteristics}
                  />
                )
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewParent;
