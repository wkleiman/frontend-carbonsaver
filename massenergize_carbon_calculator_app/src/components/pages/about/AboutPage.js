import React from 'react'
import { connect } from 'react-redux'

class AboutUsPage extends React.Component {
  render() {
    const paragraphContent = ''
    return (
      <div className="boxed_wrapper">
        <div className="col-md-10 col-lg-10 offset-md-1 col-sm-10 col-xs-12">
          <div style={{ marginTop: 70 }} />
          <div
            className={
              paragraphContent.length === 0
                ? 'col-sm-12 col-md-10 offset-md-1'
                : 'd-none'
            }
          >
            <center>
              <h2 className="cool-font" style={{ padding: 20 }}>
                About the CarbonSaver
              </h2>
            </center>
            <div
              className="community-about-text cool-font"
              style={{ color: 'gray', fontSize: 'large' }}
            >
              {paragraphContent}
            </div>
          </div>
          <div className=" col-sm-12 col-md-10 offset-md-1 mass-energize-about">
            <center>
              <h2 className="cool-font" style={{ padding: 20 }}>
                About MassEnergize
              </h2>
            </center>
            <p className="cool-font" style={{ color: 'gray' }}>
              Our mission is to provide communities with the tools and resources
              to motivate and support their residents, businesses and
              non-profits in a wide array of actions to reduce greenhouse gas
              emissions and prepare for a changing climate. We leverage the
              collective expertise, experience and buying power of multiple
              towns, cities and local organizations by collaborating with them
              on tools, strategies, and resources. This community web platform
              is one example of our work. For more information go to{' '}
              <a href="https://www.massenergize.org">www.massenergize.org</a>.
            </p>
          </div>
        </div>
      </div>
    )
  }
}

export default connect()(AboutUsPage)
