import React from 'react'
import ProductFeaturesList from '../index.props.js'
import DocsPage from './docs.mdx'

export const Basic = () => {
  return (
    <ProductFeaturesList
      heading="Why Nomad?"
      features={[
        {
          title: 'Simple and Lightweight',
          content:
            'Single 35MB binary that integrates into existing infrastructure.  Easy to operate on-prem or in the cloud with minimal overhead.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        },
        {
          title: 'Flexible Workload Support',
          content:
            'Orchestrate applications of any type - not just containers. First class support for Docker, Windows, Java, VMs, and more.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        },
        {
          title: 'Modernize Legacy Applications without Rewrite',
          content:
            'Bring orchestration benefits to existing services. Achieve zero downtime deployments, improved resilience, higher resource utilization, and more without containerization.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        },
        {
          title: 'Easy Federation at Scale',
          content:
            'Single command for multi-region, multi-cloud federation. Deploy applications globally to any region using Nomad as a single unified control plane.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        },
        {
          title: 'Multi-Cloud with Ease',
          content:
            'One single unified workflow for deploying to bare metal or cloud environments. Enable multi-cloud applications with ease.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        },
        {
          title: 'Native Integrations with Terraform, Consul, and Vault',
          content:
            'Nomad integrates seamlessly with Terraform, Consul and Vault for provisioning, service networking, and secrets management.',
          icon: 'http://www.hashicorp.com/img/icons/home-solution-nomad.svg'
        }
      ]}
    />
  )
}

export default {
  title: 'Blocks|Product Features List/Examples',
  component: ProductFeaturesList,
  parameters: { docs: { page: DocsPage } }
}
