import React from 'react'
//import { connect } from 'react-redux'
// Carousel from npm react-multi-carousel
/* import 'react-multi-carousel/lib/styles.css'; */
/* import LoadingCircle from '../../Shared/LoadingCircle' */
class ScoreCategoryRow extends React.Component {
	render() {
		const category = this.props.category;

		return (
		  <tr>
			<th colSpan="3">
			{category}
		  	</th>
		  </tr>
		  );
	}
}

class ScoreRow extends React.Component {
	render() {
		const score = this.props.score;
		const members = score.members;
		const name = (members > 0) ? score.name :
		<span style={{color: 'red'}}>
			{score.name}
		</span>;
		const points = score.points;
		return (
			<tr>
				<td>{name}</td>
				<td>{points}</td>
				<td>{members}</td>
			</tr>
		);
	}
}

class ScoreBoardTable extends React.Component {
	render() {
		const rows = [];
		let lastCategory = null;
		this.props.scores.forEach((score) => {
			if (score.category !== lastCategory) {
				rows.push(
					<ScoreCategoryRow
					category={score.category}
					key={score.category}/>
				);
			}
			rows.push(
				<ScoreRow
				score={score}
				key={score.name} />
			);
			lastCategory = score.category;
		});
		return (
			<table>
				<thead>
					<tr>
					<th>Name</th>
					<th>Points</th>
					<th>Members</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		);
	}
}


class ScoreBoardHeading extends React.Component {
	render() {
		return (
			<h1>Score Board</h1>
		);
	}
}

class ScoreBoard extends React.Component {
	render() {
		return (
			<div className="scoreBoard">
				<ScoreBoardHeading />
				<ScoreBoardTable scores={this.props.scores} />
			
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
//export default connect()(ScoreboardPage);
const SCORES = [
	{category: 'Teams', name: 'Concord-Carlisle High School', members: 55, score: 213000},
	{category: 'Teams', name: 'Concord Middle School', members: 44, score: 199000},
	{category: 'Teams', name: 'Thoreau Elementary School', members: 25, score: 67000},
	{category: 'Individuals', name: 'Elizabeth Warren', members: 1, score: 22300},
	{category: 'Individuals', name: 'Pete Buttigieg', members: 0, score: 19000},
	{category: 'Individuals', name: 'Joseph R. Biden', members: 1, score: 1300},
  
];

class ScoreBoardPage extends React.Component {
	render() {
		return (
			<ScoreBoard scores={SCORES} />			
		);
	}
}

/* ReactDOM.render(
  <ScoreBoard scores={SCORES} />,
  document.getElementById('container')
); */

export default ScoreBoardPage
