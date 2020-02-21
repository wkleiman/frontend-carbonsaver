import React from 'react'
import { connect } from 'react-redux'
// Carousel from npm react-multi-carousel
/* import 'react-multi-carousel/lib/styles.css'; */
/* import LoadingCircle from '../../Shared/LoadingCircle' */

class SummaryPage extends React.Component {
	render() {
        let paragraphContent = undefined;
		return (
			<div className="boxed_wrapper">
				<div className="col-md-10 col-lg-10 offset-md-1 col-sm-10 col-xs-12">
					<div style={{ marginTop: 70 }}></div>
					<div className={paragraphContent ? "col-sm-12 col-md-10 offset-md-1" : "d-none"}>
						<center><h2 className="cool-font" style={{ padding: 20 }}>Your Summary</h2></center>
						<div className="cool-font" style={{color:'gray',fontSize:'large'}} dangerouslySetInnerHTML={{ __html: paragraphContent }}></div>
					</div>
					<div className=" col-sm-12 col-md-10 offset-md-1 mass-energize-about">
						<center><h2 className="cool-font" style={{ padding: 20 }}>What to do next:</h2></center>
						<p className="cool-font" style={{color:'gray'}}>
							For more information go to <a href="https://www.massenergize.org">www.massenergize.org</a>.

						</p>
					</div>
				</div>
			
			</div>
		);
	}
}

/* const mapStoreToProps = (store) => {

	return {
		community: store.page.community,
		communityAdmins: store.page.communityAdmins,
		pageData: store.page.aboutPage,
		homePageData:store.page.homePageData
	}
}
*/
export default connect()(SummaryPage);