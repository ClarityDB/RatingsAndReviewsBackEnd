import React from 'react';
import ReviewList from '../src/components/ReviewList';
import IndividualReview from '../src/components/IndividualReview';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('Review List should render each child component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<ReviewList />)
  });

  // Checks whether something exists on the page or not
  test('Should render a total reviews', () => {
    expect(wrapper.find(".h4")).toBeTruthy();
  });

  test('Should render a More Reviews button', () => {
    expect(wrapper.find('.order-first')).toBeTruthy();
  })

  test('Should render Add a Review button', () => {
    expect(wrapper.find('.order-last')).toBeTruthy();
  })

  test('Should render a list of Individual Reviews', () => {
    expect(wrapper.find('.overflow-auto')).toBeTruthy();
  })
  //Missing checking for <IndividualReview /> components
})
