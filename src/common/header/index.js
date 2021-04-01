import React,{ PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionCreators } from './store'
import { CSSTransition } from 'react-transition-group';
import { actionCreators as loginActionCreators } from '../../pages/login/store'
import { 
    HeaderWrapper, 
    Logo, 
    Nav,
    NavItem, 
    NavSearch, 
    Addition, 
    Button, 
    SearchWrapper,
    SearchInfo,
	SearchInfoTitle,
	SearchInfoSwitch,
	SearchInfoList,
	SearchInfoItem, 
} from "./style";

class Header extends PureComponent {
    getListArea(){
        const { focused, list, page, totalPage, mouseIn, handleMouseEnter, handleMouseLeave, handleChangePage } = this.props;
        const newList = list.toJS();
        const pageList = [];
        if(newList.length){
            for(let i = (page-1) * 10; i < page*10; i++){
                pageList.push(
                    <SearchInfoItem key={newList[i]}>{newList[i]}</SearchInfoItem>
                )
            }
        }
        if(focused || mouseIn){
            return(
                <SearchInfo 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                >
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={()=>handleChangePage(page,totalPage,this.spinIcon)}>
                        <i ref={(icon)=>{this.spinIcon = icon}} className="iconfont spin">&#xe851;</i>
                            换一批
                        </SearchInfoSwitch>
                    </SearchInfoTitle>
                    <SearchInfoList>
                        { pageList}
                    </SearchInfoList>
                </SearchInfo>
            )
        }else{
            return null;
        }
    }
    render(){
        const { focused, list, login, handleInputFocus, handleInputBlur, logout } = this.props
        return (
            <HeaderWrapper>
                <Link to='/'>
					<Logo/>
				</Link>
                <Nav>
                    <NavItem className="left active">首页</NavItem>
                    <NavItem className="left">下载App</NavItem>
                    <NavItem className="right">
                        <i className="iconfont">&#xe636;</i>
                    </NavItem>
                    {
                        login?
                        <NavItem onClick={logout} className="right">退出</NavItem>:
                        <Link to='/login'><NavItem className="right">登录</NavItem></Link>
                    }
                        <SearchWrapper>
                            <CSSTransition
                            in={focused}
                            timeout={200}
                            classNames='slide'
                            >
                                <NavSearch 
                                    className={focused ? 'focused': ''}
                                    onFocus = {()=>{handleInputFocus(list)}}
                                    onBlur = {handleInputBlur}
                                ></NavSearch>
                            </CSSTransition>
                            <i className={focused ? 'focused zoom': 'zoom'}>
                                &#xe614;
                            </i>
                            {this.getListArea()}
                        </SearchWrapper>
                    <Addition>
                        <Button className="writting">
                            <i className="iconfont">&#xe615;</i>
                            写文章
                        </Button>
                        <Button className="reg">注册</Button>
                    </Addition>
                </Nav>
            </HeaderWrapper>
        )
    }
    componentDidMount(){
        // this.test()
        console.log(this.props)
    }
    test(){
        console.log(111)
    }
}

const mapStateToProps = (state)=>{
    return{
        focused:state.getIn(['header','focused']),
        list:state.getIn(['header','list']),
        page:state.getIn(['header','page']),
        totalPage:state.getIn(['header','totalPage']),
        mouseIn:state.getIn(['header','mouseIn']),
        login:state.getIn(['login','login']),
    }
}

const mapdispatchToProps = (dispatch)=>{
    return {
        handleInputFocus(list){
            (list.size===0) && dispatch(actionCreators.getList());
            dispatch(actionCreators.searchFocus());
        },
        handleInputBlur(){
            dispatch(actionCreators.searchBlur())
        },
        handleMouseEnter(){
            dispatch(actionCreators.mouseEnter())
        },
        handleMouseLeave(){
            dispatch(actionCreators.mouseLeave())
        },
        handleChangePage( page, totalPage, spin ){
            let originAngle = spin.style.transform.replace(/[^0-9]/ig,'')
            if(originAngle){
                originAngle = parseInt(originAngle, 10);
            }else{
                originAngle = 0
            }
            spin.style.transform = 'rotate(' + (originAngle + 360) + 'deg)';
            if (page < totalPage) {
				dispatch(actionCreators.changePage(page + 1));
			}else {
				dispatch(actionCreators.changePage(1));
			}
        },
        logout() {
			dispatch(loginActionCreators.logout())
		}
    }
}

export default connect(mapStateToProps, mapdispatchToProps)(Header);