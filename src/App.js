import React from 'react';
import { Header, Button, Segment, Card, Icon, Grid, } from 'semantic-ui-react';
import styled, { keyframes } from 'styled-components';
import axios from 'axios';

class App extends React.Component {
  state = { repos: [] }

  getRepos = () => {
    axios.get('https://api.github.com/users/kirstenquist5/repos?sort=created')
      .then(res => {
        this.setState({ repos: res.data })
      })
  }

  listRepos = () => {
    return this.state.repos.map(repo => {
      const Component = repo.open_issues > 0 ? IssueCard : StyledCard
      return (
        <Grid.Column key={repo.id} width={4}>
          <Component>
            <Card.Content>
              <Card.Header>
                <Truncated>
                  {repo.full_name}
                </Truncated>
              </Card.Header>
              <Card.Meta>
                {repo.description}
              </Card.Meta>
              { repo.stargazers_count > 0 &&
                <Star>
                  <Icon name='star' />
                </Star>
              }
            </Card.Content>
          </Component>
        </Grid.Column>
      )
    })
  }

  render() {
    return (
      <AppContainer>
        <Button onClick={this.getRepos}>Get Repos</Button>
        <HeaderText fSize='large' color={'blue'}>My Portfolio</HeaderText>
        <Segment as={Transparent}>
          <HeaderText color={'red'}>My Projects</HeaderText>
          <Grid>
            {this.listRepos()}
          </Grid>
        </Segment>
        <Segment as={Transparent}>
          <HeaderText fSize='small' color={'green'}>Contact</HeaderText>
        </Segment>
      </AppContainer>
    )
  }
}

const fontSize = (size) => {
  switch (size) {
    case 'large':
      return '4rem';
    case 'small':
      return '1rem';
    default:
      return '2rem';
  }
}

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Star = styled.div`
  display: inline-block;
  color: yellow;
  text-shadow: 1px 1px 1px black;
  animation: ${rotate360} 2s linear infinite;
`

const StyledCard = styled(Card)`
  height: 200px;
`

const IssueCard = styled(StyledCard)`
  border: solid 1px red !important;
`

const AppContainer = styled.div`
  background: linear-gradient(to bottom right, aliceblue, black);
`

const Truncated = styled.div`
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Transparent = styled.div`
  background: transparent !important;
`

const HeaderText = styled.h1`
  color: white !important;
  ${'' /* color: ${props => props.color } !important; */}
  text-align: center;

  font-size: ${props => fontSize(props.fSize)} !important
`

export default App;