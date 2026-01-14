'use client'
import React from 'react'
import { Button, Card, Container, Col} from 'citrica-ui-toolkit'

const PageHome = () => {
  return (
    <>
    <Container noPadding>
      <Col cols={{ sm:12, md:6, lg:4 }} >
        <h1>Welcome to Citrica UI Toolkit Integration!</h1>
        <Card>
          <h2>Citrica Card</h2>
          <p>This is a card component from Citrica UI Toolkit.</p>
          <Button variant="secondary">Citrica Button</Button>
        </Card>
      </Col>
      <Col cols={{ sm:12, md:6, lg:4 }} >
        <h1>Welcome to Citrica UI Toolkit Integration!</h1>
        <Card>
          <h2>Citrica Card</h2>
          <p>This is a card component from Citrica UI Toolkit.</p>
          <Button variant="primary">Citrica Button</Button>
        </Card>
      </Col>
      <Col cols={{ sm:12, md:6, lg:4 }} >
        <h1>Welcome to Citrica UI Toolkit Integration!</h1>
        <Card>
          <h2>Citrica Card</h2>
          <p>This is a card component from Citrica UI Toolkit.</p>
          <Button variant="primary">Citrica Button</Button>
        </Card>
      </Col>
    </Container>
    </>
  )
}

export default PageHome