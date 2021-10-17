const Basic = {
  product: 'terraform',
  linkStyle: 'buttons',
  content:
    'Terraform Cloud is the fastest way to adopt Terraform, the world’s most widely used multi-cloud provisioning product.\n\nOffered as a service, Terraform Cloud provides everything practitioners, teams, and organizations need to create and collaborate on infrastructure and manage risks for security, compliance and operational constraints.',
  links: [
    { text: 'primary action', url: '#' },
    { text: 'secondary action', url: '#' },
    { text: 'tertiary', url: '#' },
  ],
  children: 'bar',
}

const WithCustomContent = {
  content: (
    <p style={{ color: 'var(--brand)' }}>
      <strong>Hello</strong> world, this is some <em>custom</em> React content
    </p>
  ),
  linkStyle: 'buttons',
  links: [
    { text: 'primary action', url: '#' },
    { text: 'secondary action', url: '#' },
    { text: 'tertiary', url: '#' },
  ],
  children: 'bar',
}

const WithCheckboxes = {
  product: 'consul',
  content: (
    <p>
      <strong>Hello</strong> world, this is some <em>custom</em> React content.
      Time to check some things off...
    </p>
  ),
  linkStyle: 'buttons',
  checkboxes: ['One item', 'Second', 'And third'],
  children: 'bar',
}

const DarkTheme = {
  content: (
    <>
      <h3>¿Qué tal?</h3>
      <p>
        <strong>Hello</strong> world, this is some <em>custom</em> React content
      </p>
    </>
  ),
  linkStyle: 'buttons',
  theme: 'dark',
  links: [
    { text: 'primary action', url: '#' },
    { text: 'secondary action', url: '#' },
    { text: 'tertiary', url: '#' },
  ],
  children: 'bar',
}

const GrayTheme = {
  content: (
    <>
      <h3>Por Ejemplo</h3>
      <p>
        <strong>Hello</strong> world, this is some <em>custom</em> React content
      </p>
    </>
  ),
  linkStyle: 'buttons',
  product: 'waypoint',
  theme: 'gray',
  links: [
    { text: 'primary action', url: '#' },
    { text: 'secondary action', url: '#' },
    { text: 'tertiary', url: '#' },
  ],
  children: 'bar',
}

export default {
  Basic,
  WithCustomContent,
  WithCheckboxes,
  DarkTheme,
  GrayTheme,
}
