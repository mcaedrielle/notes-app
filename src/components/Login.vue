<template>
  <div class="login-container">
    <v-row class="d-flex justify-center">
      <v-col>
        <section id="login" class="mx-auto"> 
          <form>
            <h2 class="mx-auto black--text">Login</h2>
                <input type="text" v-model="email" placeholder="E-mail address" />
                <input type="password" v-model="password" placeholder="Password" />
                <button v-on:click="login">Log in</button>
                <!-- <a href="/register" class="text-center black--text">Not yet a user? Register here!</a> -->
                <span><router-link to="/register">Not yet a user? Register here!</router-link></span>
            </form>
        </section>
      </v-col>
    </v-row>   
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            alert(`You are now logged in as ${user.user.email}`);
            this.$router.go({ path: '/' })
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>

<style scoped>

section{
	width:25%;
	min-height:25%;
	display:flex;

}
form{
	display:flex;
	flex-direction:column;
	padding: 15px; 
}
h2{
	font-family: 'Archivo Black', sans-serif;
	color:#e0dada;
}

.info{
	width:100%;
	padding: 1em 5px;
	text-align:center;
	min-height:45px;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}

.info.error{
	border:1px solid #a90e00;
	background-color: #ff3c41;
	color:#a90e00;
}

.info p{
	margin:auto;
	padding:5px;
}
.info.good{
	border:1px solid #416d50;
	background-color: #47cf73;
	color:#416d50;
}

input{
	height:35px;
	padding: 5px 5px;
	margin: 10px 0px;
	background-color:#e0dada;
	border:none;
}
button{
	height:40px;
	padding: 5px 5px;
	margin: 10px 0px;
	font-weight:bold;
	background-color:#be5256;
	border:none;
	color:#e0dada;
	cursor:pointer;
	font-size:16px;
}
button:hover{
	background-color:#711f1b;
}

@-webkit-keyframes shake{
	from, to{
		-webkit-transform: translate3d(0, 0, 0);
		transform:translate3d(0,0,0);
	}
	10%,30%,50%,70%,90%{
		-webkit-transform: translate3d(-10px, 0, 0);
		transform:translate3d(-10px,0,0);
	}
	20%,40%,60%,80%{
		-webkit-transform: translate3d(10px, 0, 0);
		transform:translate(10px,0,0);
	}
}

.shake{
	animation-name: shake;
	animation-duration:1s;
	/*animation-fill-mode: both;*/
}

@media screen and (max-width: 780px) {
	section{
		width:90%;
	}
}
</style>