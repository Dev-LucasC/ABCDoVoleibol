import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Testevolei1 from './logo512.jpg'
import './cards.css'

export default function Cards() {
  return (
    <section className="container container__cards">
      <h1> Noticias </h1>
      <hr size="6" width="100%" align="left" color="black"></hr>
      <div className="container__cards-noticias">
        <Card className='cards' sx={{ maxWidth: 550 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={Testevolei1}
              alt="green iguana"
              cover="object-fit"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card  className='cards' sx={{ maxWidth: 550 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={Testevolei1}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card  className='cards' sx={{ maxWidth: 550 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={Testevolei1}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card  className='cards' sx={{ maxWidth: 550 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="400"
              image={Testevolei1}
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000
                species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </section>
  );
}
