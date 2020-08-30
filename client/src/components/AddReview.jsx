import React from 'react';
import axios from 'axios';

class AddReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formStarRating: null,
      formRecommended: null,
      formSizeRating: null,
      formSizeID: null,
      formWidthRating: null,
      formWidthID: null,
      formComfortRating: null,
      formComfortID: null,
      formQualityRating: null,
      formQualityID: null,
      formLengthRating: null,
      formLengthID: null,
      formFitRating: null,
      formFitID: null,
      formNameInput: '',
      formEmailInput: '',
      formSummaryInput: '',
      formBodyInput: '',
      formValidated: false,
      renderAlert: false,
      formPreviouslySubmitted: false,
      charObj: null,
    };
  }

  /// ////////////////////////////////////////////////////////////////////
  // Controlled Form Functions
  onStarRatingChange(event) {
    this.setState({
      formStarRating: Number(event.target.value),
    }, () => {
      // console.log('Current Selection from Star Rating: ', this.state.formStarRating);
      // console.log('Current Selection from Star Rating: ', typeof this.state.formStarRating);
    });
  }

  onRecommendedChange(event) {
    let value = '';
    if (event.target.value === 'true') {
      value = true;
    } else {
      value = false;
    }
    this.setState({
      formRecommended: value,
    }, () => {
      // console.log('Current Selection from Recommended: ', this.state.formRecommended);
      // console.log('Current Selection from Recommended: ', typeof this.state.formRecommended);
    });
  }

  onFormNameChange(event) {
    this.setState({
      formNameInput: event.target.value,
    }, () => {
      // console.log('Current Value from Form Name Input: ', this.state.formNameInput);
    });
  }

  onFormEmailChange(event) {
    this.setState({
      formEmailInput: event.target.value,
    }, () => {
      // console.log('Current Value from Form Email Input: ', this.state.formEmailInput);
    });
  }

  onFormSummaryChange(event) {
    this.setState({
      formSummaryInput: event.target.value,
    }, () => {
      // console.log('Current Value from Form Summary Input: ', this.state.formSummaryInput);
    });
  }

  onFormBodyChange(event) {
    this.setState({
      formBodyInput: event.target.value,
    }, () => {
      // console.log('Current Value from Form Body Input: ', this.state.formBodyInput);
    });
  }

  onFormSizeChange(event) {
    this.setState({
      formSizeRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Size Rating: ', this.state.formSizeRating);
    });
  }

  onFormWidthChange(event) {
    this.setState({
      formWidthRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Width Rating: ', this.state.formWidthRating);
    });
  }

  onFormComfortChange(event) {
    this.setState({
      formComfortRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Comfort Rating: ', this.state.formComfortRating);
    });
  }

  onFormQualityChange(event) {
    this.setState({
      formQualityRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Quality Rating: ', this.state.formQualityRating);
    });
  }

  onFormLengthChange(event) {
    this.setState({
      formLengthRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Length Rating: ', this.state.formLengthRating);
    });
  }

  onFormFitChange(event) {
    this.setState({
      formFitRating: Number(event.target.value),
    }, () => {
      // console.log('Current Value from Form Fit Rating: ', this.state.formFitRating);
    });
  }
  /// ////////////////////////////////////////////////////////////////////

  formValidationCheck() {
    // Check Name
    if (this.state.formNameInput.length > 0 && this.state.formNameInput.length < 60) {
      // console.log('passed name check');
      // Check Email
      if (this.state.formEmailInput.length > 0 && this.state.formEmailInput.length < 60) {
        // console.log('passed email check');
        // Check Star Rating
        if (typeof this.state.formStarRating === 'number') {
          // console.log('passed rating check');
          // Check Recommend
          if (typeof this.state.formRecommended === 'boolean') {
            // console.log('passed recommended check');
            // Check Characteristics
            const characteristicsChecked = [];
            let characteristicsCount = 0;
            this.props.characteristics.map((type) => {
              // Compare mapped props to what is filled out
              characteristicsCount++;
              const currentCharRatingKey = `form${type[0]}Rating`;
              // console.log('current currentCharRatingKey', currentCharRatingKey);
              // console.log('current currentCharRatingKey in state', this.state[currentCharRatingKey]);
              if (typeof this.state[currentCharRatingKey] === 'number') {
                characteristicsChecked.push(type[0]);
                const currentCharIDKey = `form${type[0]}ID`;
                // GET ID AND SETSTATE HERE
                this.setState({
                  [currentCharIDKey]: type[1].id,
                }, () => {
                  // console.log('after dynamic state set', [currentCharIDKey]);
                });
              }
            });
            if (characteristicsChecked.length === characteristicsCount) {
              // console.log('passed characteristics check');
              // Check Summary
              if (this.state.formSummaryInput.length > 0 && this.state.formSummaryInput.length < 60) {
                // console.log('passed summary check');
                // Check Body
                if (this.state.formBodyInput.length > 50 && this.state.formBodyInput.length < 1000) {
                  // console.log('passed body check. passed all checks');
                  this.setState({
                    // formValidated: true,
                    renderAlert: false,
                  }, () => {
                    // console.log('Form successfully validated', this.state.formValidated);
                    // console.log('Form successfully validated renderalert (should be false)', this.state.renderAlert);

                    // Create Char obj
                    this.createCharacteristicObject();
                  });
                  if (this.state.formPreviouslySubmitted === false) {
                    return true;
                  }
                  if (this.state.formPreviouslySubmitted) {
                    // console.log('already submitted', this.state.formPreviouslySubmitted);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  createCharacteristicObject() {
    const characteristicsObject = {};
    if (typeof this.state.formSizeRating === 'number') {
      characteristicsObject['size'] = this.state.formSizeRating;
    }
    if (typeof this.state.formWidthRating === 'number') {
      characteristicsObject['width'] = this.state.formWidthRating;
    }
    if (typeof this.state.formComfortRating === 'number') {
      characteristicsObject['comfort'] = this.state.formComfortRating;
    }
    if (typeof this.state.formQualityRating === 'number') {
      characteristicsObject['quality'] = this.state.formQualityRating;
    }
    if (typeof this.state.formLengthRating === 'number') {
      characteristicsObject['length'] = this.state.formLengthRating;
    }
    if (typeof this.state.formFitRating === 'number') {
      characteristicsObject['fit'] = this.state.formFitRating;
    }
    this.setState({
      charObj: characteristicsObject,
    }, () => {
      // console.log('confirming charobj creation', this.state.charObj);
    });
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (this.formValidationCheck()) {
      // Create Characteristics Object
      setTimeout(() => {
        const dataObj = {
          rating: this.state.formStarRating,
          summary: this.state.formSummaryInput,
          body: this.state.formBodyInput,
          recommend: this.state.formRecommended,
          name: this.state.formNameInput,
          email: this.state.formEmailInput,
          characteristics: this.state.charObj,
        };
        // console.log('After creation of data object', dataObj);
        // Submit the form
        // axios.post(`http://52.26.193.201:3000/reviews/${this.props.id}`, dataObj)
        axios({
          method: 'post',
          url: `http://localhost:3555/reviews/${this.props.id}`,
          product_id: this.props.id,
          data: dataObj,
        })
          .then((result) => {
            console.log('axios .then result', result);
          })
          .catch((err) => {
            console.error(err);
          });
        this.setState({
          formPreviouslySubmitted: true,
        }, () => {
          // console.log('logged form submission (should be true)', this.state.formPreviouslySubmitted);
        });
      }, 1000);
    } else {
      // render alert
      this.setState({
        renderAlert: true,
      });
      // console.log('failed validation check');
    }
  }

  /// ////////////////////////////////////////////////////////////////////
  render() {
    const charChange = {
      Size: this.onFormSizeChange.bind(this),
      Width: this.onFormWidthChange.bind(this),
      Comfort: this.onFormComfortChange.bind(this),
      Quality: this.onFormQualityChange.bind(this),
      Length: this.onFormLengthChange.bind(this),
      Fit: this.onFormFitChange.bind(this),
    };

    return (
      <div>
        {this.state.renderAlert
          ? (
            <div className="alert alert-danger" role="alert">
              Oops! One or more of the fields do not meet the requirements!
              Make sure you have filled every field.
            </div>
          )
          : null}
        {this.state.formPreviouslySubmitted
          ? (
            <div className="alert alert-success" role="alert">
              Review submitted!
            </div>
          )
          : null}
        <form>
          <div id="identification" className="form-group row">
            <div className="col">
              {/* What is your nickname */}
              <input type="text" className="form-control" placeholder="Nickname" value={this.state.formNameInput} onChange={this.onFormNameChange.bind(this)} />
              <small className="form-text text-muted">For privacy, do not use your full name or email</small>
            </div>
            <div className="col-8">
              {/* Your email */}
              <input type="email" className="form-control" placeholder="youremail@email.com" value={this.state.formEmailInput} onChange={this.onFormEmailChange.bind(this)} />
              <small className="form-text text-muted">Put a fake email</small>
            </div>
          </div>
          <div className="form-group row">
            {/* Overall Rating */}
            <div id="OverallRating" className="col-4" onChange={this.onStarRatingChange.bind(this)}>
              {/* <label htmlFor="OverallRating">How Many Stars?</label> */}
              <small className="form-text">How many stars would you rate this?</small>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="starRatingRadioOption" id="starRatingOption1" value={1} />
                <label className="form-check-label" htmlFor="starRatingOption1">1</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="starRatingRadioOption" id="starRatingOption2" value={2} />
                <label className="form-check-label" htmlFor="starRatingOption2">2</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="starRatingRadioOption" id="starRatingOption3" value={3} />
                <label className="form-check-label" htmlFor="starRatingOption3">3</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="starRatingRadioOption" id="starRatingOption4" value={4} />
                <label className="form-check-label" htmlFor="starRatingOption4">4</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="starRatingRadioOption" id="starRatingOption5" value={5} />
                <label className="form-check-label" htmlFor="starRatingOption5">5</label>
              </div>
            </div>
            {/* Do you recommend this product? */}
            <div id="Recommend" className="col" onChange={this.onRecommendedChange.bind(this)}>
              {/* <label htmlFor="Recommend">Do you recommend this product?</label> */}
              <small className="form-text">Do you recommend this product?</small>
              <div className="form-check form-check-inline">
                <input className="for-check-input" type="radio" name="recommendOption" id="recommendYes" value />
                <label className="form-check-label" htmlFor="recommendYes"> Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="for-check-input" type="radio" name="recommendOption" id="recommendNo" value={false} />
                <label className="form-check-label" htmlFor="recommendNo"> No</label>
              </div>
            </div>
          </div>
          {/* Characteristics */}
          <div id="Characteristics" className="form-group">
            <div className="row">
              <div className="col align-self-start">
                Please Rate Each Characteristic:
              </div>
            </div>
            <div className="row">
              {this.props.characteristics
                ? this.props.characteristics.map((type) => (
                  <div key={type[0]} className="col-4 my-3 px-3">
                    <div className="bg-light rounded">
                      <div className="row">
                        <div className="col text-center">
                          <small>{type[0]}</small>
                        </div>
                      </div>
                      <div className="row align-self-end">
                        <div className="col">
                          <div className="form-group d-flex justify-content-around" onChange={charChange[type[0]]}>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name={`${type[0]}RatingOption`} id={`${type[0]}RatingOption1`} value={1} />
                              <label className="form-check-label" htmlFor={`${type[0]}RatingOption1`}>1</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name={`${type[0]}RatingOption`} id={`${type[0]}RatingOption2`} value={2} />
                              <label className="form-check-label" htmlFor={`${type[0]}RatingOption2`}>2</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name={`${type[0]}RatingOption`} id={`${type[0]}RatingOption3`} value={3} />
                              <label className="form-check-label" htmlFor={`${type[0]}RatingOption3`}>3</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name={`${type[0]}RatingOption`} id={`${type[0]}RatingOption4`} value={4} />
                              <label className="form-check-label" htmlFor={`${type[0]}RatingOption4`}>4</label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" name={`${type[0]}RatingOption`} id={`${type[0]}RatingOption5`} value={5} />
                              <label className="form-check-label" htmlFor={`${type[0]}RatingOption5`}>5</label>
                            </div>
                          </div>
                        </div>
                      </div>
                      {type[0] === 'Size'
                        ? (
                          <div className="row">
                            <small className="col font-weight-light text-muted">Too small</small>
                            <small className="col font-weight-light text-muted text-center">Perfect</small>
                            <small className="col font-weight-light text-muted text-right">Too big</small>
                          </div>
                        )
                        : type[0] === 'Width'
                          ? (
                            <div className="row">
                              <small className="col font-weight-light text-muted">Too narrow</small>
                              <small className="col font-weight-light text-muted text-center">Perfect</small>
                              <small className="col font-weight-light text-muted text-right">Too wide</small>
                            </div>
                          )
                          : type[0] === 'Comfort'
                            ? (
                              <div className="row">
                                <small className="col font-weight-light text-muted">Uncomfortable</small>
                                <small className="col font-weight-light text-muted text-right">Perfect</small>
                              </div>
                            )
                            : type[0] === 'Quality'
                              ? (
                                <div className="row">
                                  <small className="col font-weight-light text-muted">Poor</small>
                                  <small className="col font-weight-light text-muted text-right">Perfect</small>
                                </div>
                              )
                              : type[0] === 'Length'
                                ? (
                                  <div className="row">
                                    <small className="col font-weight-light text-muted">Too short</small>
                                    <small className="col font-weight-light text-muted text-center">Perfect</small>
                                    <small className="col font-weight-light text-muted text-right">Too long</small>
                                  </div>
                                )
                                : type[0] === 'Fit'
                                  ? (
                                    <div className="row">
                                      <small className="col font-weight-light text-muted">Too tight</small>
                                      <small className="col font-weight-light text-muted text-center">Perfect</small>
                                      <small className="col font-weight-light text-muted text-right">Too loose</small>
                                    </div>
                                  )
                                  : null}
                    </div>
                  </div>
                ))
                : "Hasn't loaded"}
            </div>
          </div>
          {/* Review Summary input - text */}
          <div id="Summary" className="form-group row">
            <div className="col">
              <input type="text" className="form-control" placeholder="Summary: i.e. Best purchase ever!" value={this.state.formSummaryInput} onChange={this.onFormSummaryChange.bind(this)} />
            </div>
          </div>
          {/* Review Body - textarea */}
          <div id="Body" className="form-group row">
            <div className="col">
              <textarea className="form-control" rows="4" placeholder="Why did you like the product or not?" value={this.state.formBodyInput} onChange={this.onFormBodyChange.bind(this)} />
              <small>
                {this.state.formBodyInput.length < 50
                  ? `(${50 - this.state.formBodyInput.length})`
                  : 'Minimum reached'}
              </small>
            </div>
          </div>
        </form>
        <div className="row">
          <div className="col">
            <button type="button" className="btn btn-outline-primary" onClick={this.handleFormSubmit.bind(this)}>Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddReview;
