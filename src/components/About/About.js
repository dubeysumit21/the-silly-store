import React, {Component} from 'react';
import classes from './About.css';
import Header from '../Header/Header';
import Slider from 'react-slick';
import {connect} from 'react-redux';

class About extends Component{
    render(){
        return(
            <div className={classes.container}>
                <div className={classes.navigation}>
                    <div className={classes.navigationHolder}><Header properties={this.props}/></div>
                </div>
                <div className={classes.imageSlider}>
                    <Slider centerPadding='400px' adaptiveHeight={false} autoplay ={true} autoPlaySpeed={500} slidesToShow={1} slidesToScroll={1} dots={true}>
                        <div className={classes.div1}><img style={{top: '25px', position: 'relative', width: '100%'}} src="https://www.michigan.org/sites/default/files/styles/15_6_desktop/public/camping-hero_0_0.jpg?itok=mgGs0-vw&timestamp=1520373602" /></div>
                        <div className={classes.div2}><img style={{top: '25px', position: 'relative', width: '100%'}} src="http://dmgupcwbwy0wl.cloudfront.net/system/images/000/099/620/ed84fc2df67e25befa529f423c554c79/original/camping_at_vaitarna.jpg?1550899414" /></div>
                        <div className={classes.div3}><img style={{top: '25px', position: 'relative', width: '100%'}} src="https://in.bmscdn.com/nmcms/media-desktop-pawna-lake-camping-2018-9-28-t-13-23-59.jpeg" /></div>
                    </Slider>
                </div>
                <div className={classes.mainBody}>
                    <h2> Welcome {this.props.userName} </h2>
                    {this.props.userName ? null : <h2>Please, Login to Continue.</h2>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userName : state.userName,
        userId : state.userId
    }
}
export default connect(mapStateToProps)(About); 