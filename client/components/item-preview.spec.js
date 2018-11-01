/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {ItemPreview} from './item-preview'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('ItemPreview', () => {
  let itemPreview

  beforeEach(() => {
    itemPreview = shallow(<ItemPreview name="Test Gravy" />)
  })

  it('renders the item name in an h3', () => {
    expect(itemPreview.find('h3').text()).to.be.equal('Test Gravy')
  })
})
