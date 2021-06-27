import React, {useState, useEffect} from 'react'
import {Grid, Typography, makeStyles, Paper} from "@material-ui/core"
import './App.css';
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const useStyles = makeStyles({
  loading:{
    background:"#E0A08D ",
    height:"100vh"
  },
  root:{
    background:"#E0A08D",
    minHeight:"100vh",
    color:"#19005A"
  },
  content:{
    marginTop:50
  },
  card:{
    margin:"20px 20px",
    position:"relative"
  },
  img:{
    width:"200px",
    borderRadius:"10px 10px 0px 0px",
    display:"box",
    boxShadow:"1px 1px 9px #757575"
  },
  info:{
    position:"relative",
    background:"white",
    top:"-5px",
    borderRadius:"0px 0px 10px 10px"
  },
  gender:{
    position:"absolute",
    top:-50,
    right:10,
    background:"#19005A",
    borderRadius:"50%",
    width:45,
    height:45,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  mail:{
    position:"absolute",
    top:-50,
    left:10,
    background:"#19005A",
    borderRadius:"50%",
    width:45,
    height:45,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  details:{
    display:"flex",
    justifyContent:"space-around"
  }
})





function App() {

  const url ="https://randomuser.me/api/"

  const [fetched, setFetched] = useState({})

  const [isLoading, setIsLoading] = useState(true)

  
  const [gender, setGender] = useState("male-sign")

  useEffect(() => {
    fetch(`${url}`)
      .then(res => res.json())
        .then(result => {
          setFetched(result)
          setIsLoading(false)
        })
    
  }, []);

  let user = {}

  if(!isLoading){
    user = fetched.results[0]
    console.log(user)
  }


  const populate = () => {
    return (
      <div className={classes.card} data-aos="fade-up" data-aos-duration={600} aos-delay={200}>
        <section className={classes.imgSection}>
          <img src={user.picture.large} className={classes.img}/>
        </section>

        <section className={classes.info}>

          <Typography variant="h5" className={classes.name}>
            {user.name.first} {user.name.last}
          </Typography>

          <span className={classes.gender}>
            <box-icon size="md" name={user.gender==="male" ? "male-sign" : "female-sign"} color="white"/>
          </span>
                      
          <a href={`mailto:${user.email}`}>
            <span className={classes.mail}>
              <box-icon size="md" name="mail-send" color="white"/>
            </span>
          </a>

          <Typography variant="subtitle1" className={classes.details}>
            <span>{user.dob.age}</span>
            <span>{user.location.country}</span>
          </Typography>
        </section>
      </div>
    )
  }

  const classes = useStyles()
  return (
    <div className="App">

      {
        !isLoading ? (
          (<>
              <Grid xs={12} className={classes.root} container  justify="center" >
                <Grid xs={11} container direction="column">
                  <Typography className={classes.header} variant="h1">
                    Users
                  </Typography>
                  <hr width="50%"/>
                </Grid>

                <Grid xs={11} className={classes.content} container justify="center" >
                  {populate()}
                  {populate()}
                  {populate()}
                  {populate()}
                  {populate()}
                  {populate()}
                  {populate()}
                  {populate()}
                </Grid>
              </Grid>
          </>)
        ) : (
          (
            <Grid xs={12} className={classes.loading} container direction="column" justify="center" alignItems="center">
              <box-icon name='loader-circle' animation='spin' size="lg"/>
              <Typography variant="h4" style={{position:"relative", }}>
                Please Wait ... 
              </Typography>
            </Grid>)
        )
      }
    </div>
  );
}

export default App;
