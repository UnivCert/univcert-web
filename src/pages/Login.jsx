import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import loginlogo from "../assets/advertisement-image.svg"
import univcertlogo from "../assets/UNIVCERT.svg"
import logoimg from "../assets/logoimg.svg"
import ContactUsButton from "../components/ContactUsButton"
import axios from "axios";
import "./Login.css"

const Login = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };
    const [mypage, setmypage] = useState(false);
    const baseUrl = 'https://univcert.com:8080/api';

    const [emailmax, setemailmax] = useState();
    const [apikey, setapikey] = useState();
    const [email, setemail] = useState();
    const [team_name, setteam_name] = useState();
    const [joinbutton, setjoinbutton] = useState(false);

    const regexTeam = new RegExp('.{2,20}');
    const regexEmail = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    
    const handleChange_email = (e)=>{
        e.preventDefault();
        setemail(e.target.value);
    }

    const handleChange_team_name = (e)=>{
        e.preventDefault();
        setteam_name(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        if(team_name==null) {
            alert("소속명을 입력해주세요.");
        }
        else if(email==null){
            alert("이메일을 입력해주세요.");
        }
        else{
            await axios
                .post(baseUrl + "/login", {
                    email:email,
                    team_name:team_name,
                },
                {
                    withCredentials: true // 쿠키 cors 통신 설정
                })
                .then(response=>{
                    //console.log(response);
                    //console.log(email, team_name);
                    if (response.status === 200) {
                        alert("로그인 성공!");
                        setemailmax(response.data.data.queryCount);
                        setapikey(response.data.data.key);
                        setmypage(true);
                    } else if (response.status === 400) {
                        alert("로그인 실패, API 키 발급을 위해 먼저 회원가입을 진행해 주세요.");
                    }
                },
                (error)=>{
                    console.log(error);             
                    if (error.code!=null) {
                        alert("등록되지 않은 이메일이거나 소속명이 일치하지 않습니다.");
                    }  
                });
            }
        }

        
    const handleJoin = async (e) => {       
        e.preventDefault();
        axios.defaults.withCredentials = true;
        if (regexTeam.test(team_name)===false) {
            alert("소속명을 2글자 이상 입력해주세요.");
        }
        else if(regexEmail.test(email)===false){
            alert("이메일 형식이 올바르지 않습니다.");
        }
        else{
            await axios
                .post(baseUrl + "/join", {
                    email:email,
                    team_name:team_name,
                },
                {
                    withCredentials: true // 쿠키 cors 통신 설정
                    })
                .then(response=>{
                    console.log(response); 
                    if (response.data.code === 400) {
                        alert(response.data.message);
                    } else if (response.status === 200) {
                        alert("회원가입 성공! 로그인 버튼을 눌러주세요.");
                        setjoinbutton(true);
                    }                    
                },
                (error)=>{
                    console.log(error);              
                    if (error.code!=null) {
                        alert("회원가입 실패. 도메인명 미입력.");
                    }  
                });  
            }        
        }  
        
    
  return (
    <div className="home-main"> 
        <div className="login-header">
            <img className="logoimg" alt="logo" src={logoimg} onClick={goToHome}/>
            <img className="univcertlogo" alt="logo" src={univcertlogo} onClick={goToHome}/>
        </div> 
        <div className="advertisement-main">
            <img className="advertisement-image" alt="이미지" src={loginlogo}/>
        </div>            
        <div className="signup-main">
            <div className="body-outer" >
            {mypage?
                <div class="ModalBody Body_body__KI0OY SignUpOrLogin_modal__VDGVH">
                    <div class="TextPanel_className__J3J2W">
                        <h1>API 키 확인을 위한 마이페이지</h1>
                    </div>
                    <div class="InputPanel_wrapper__RXp1k">
                        <input class="InputPanel_password__my_BO" type="password" autocomplete="password"></input>
                        <div class="style_wrapper__6RiUK InputPanel_email__aEAmZ">
                            <label for="email" maxlength='2' class="style_label__BKYHB">도메인 명 (소속명) </label>
                            <div class="style_body__A6XnO">
                                <input type="text" id="email" value={team_name}></input>
                            </div>
                        </div>
                        <div class="style_wrapper__6RiUK InputPanel_email__aEAmZ">
                            <label for="email" class="style_label__BKYHB">개발자 이메일 </label>
                            <div class="style_body__A6XnO">
                                <input type="email"  id="email" value={email}></input>
                            </div>
                        </div>
                        <div class="style_wrapper__6RiUK InputPanel_email__aEAmZ">
                            <label for="email" class="style_label__BKYHB">API KEY</label>
                            <div class="style_body__A6XnO">
                                <input type="text"  id="email" value={apikey}></input>
                            </div>
                        </div>
                        <div class="style_wrapper__6RiUK InputPanel_email__aEAmZ">
                            <label for="email" class="style_label__BKYHB">오늘 메일 발송 횟수 (최대 200)</label>
                            <div class="style_body__A6XnO">
                                <input type="email" id="email" value={emailmax}></input>
                            </div>
                        </div>            
                    </div>
                </div>

                :

                <div class="Body_body__KI0OY">
                    <div class="TextPanel_className__J3J2W">
                        <h1>API 키 확인을 위한 로그인</h1>
                    </div>
                    <div class="InputPanel">
                        <input class="InputPanel_password__my_BO" type="password" autocomplete="password"></input>
                        <div class="InputPanel">
                            <label for="email" class="style_label__BKYHB">도메인 명 (소속명) </label>
                            <div class="style_body__A6XnO">
                                <input type="text" onChange={handleChange_team_name} placeholder="예) univcert.com &nbsp; or &nbsp; 우아한형제들" id="email" value={team_name} autofocus></input>
                            </div>
                        </div>
                        <div class="InputPanel">
                            <label for="email" class="style_label__BKYHB">개발자 이메일 </label>
                            <div class="style_body__A6XnO">
                                <input type="email" onChange={handleChange_email} placeholder="예) abc@gmail.com" id="email" value={email} minLength="4"></input>
                            </div>
                        </div>
                        <div class="InputPanel_buttons__w391m">
                            <button type="button" class="login-button"
                            onClick={handleSubmit}>
                                로그인
                            </button>
                            
                            
                            <div class="InputPanel_divider__WEgZ3"></div>
                            <div class="InputPanel_socialWrapper__Dhaxo isKR">
                                <div class="InputPanel_socialLogins__j0wq7">아직 회원이 아니신가요?</div>
                                { joinbutton ?
                                <p className="join-complete">"가입이 완료되었습니다.<br/>로그인 버튼을 눌러주세요."</p>
                                :
                                <button className="create-button" onClick={handleJoin}>
                                    회원가입 후 API 키 자동 발급
                                </button>
                                }
                            </div>
                        </div>
                        <p class="style_wrapper__MbwMv">회원가입 시 도메인 명과 개발자 이메일을 기입한 후 버튼을 누릅니다.</p>
                    </div>
                </div>

                }

            </div>
        </div>
        <ContactUsButton/>         
    </div>
  );
}

export default Login;