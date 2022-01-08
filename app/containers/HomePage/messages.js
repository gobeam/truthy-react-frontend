/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'NestJS based headless CMS',
  },
  startedButton: {
    id: `${scope}.startedButton`,
    defaultMessage: 'Get Started',
  },
  truthyHelp: {
    id: `${scope}.truthyHelp`,
    defaultMessage: 'What Truthy helps you?',
  },
  contribTitle: {
    id: `${scope}.contribTitle`,
    defaultMessage: 'Meet our contributors',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage:
      'Save your time by using Truthy CMS. Easy to customize with pre loaded modules that saves your valuable time to create fullfledged secure CMS.',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  popularTitle: {
    id: `${scope}.popularTitle`,
    defaultMessage: 'Popular Stack',
  },
  popularDescription: {
    id: `${scope}.popularDescription`,
    defaultMessage:
      'Truthy is build with popular frameworks like NestJS and ReactJS. It is easy to use and maintain.',
  },
  securityTitle: {
    id: `${scope}.securityTitle`,
    defaultMessage: 'Security',
  },
  securityDescription: {
    id: `${scope}.securityDescription`,
    defaultMessage:
      'Built-in authentication and authorization using JWT (refresh token concept). OTP module for 2FA.',
  },
  developmentTitle: {
    id: `${scope}.developmentTitle`,
    defaultMessage: 'Development',
  },
  developmentDescription: {
    id: `${scope}.developmentDescription`,
    defaultMessage:
      'Easy to customize and extend each component, saving you time and money.',
  },
  moduleTitle: {
    id: `${scope}.moduleTitle`,
    defaultMessage: 'Built-in Modules',
  },
  moduleDescription: {
    id: `${scope}.moduleDescription`,
    defaultMessage:
      'Role based access controls, user management, Dashboard, Email modules, Security modules and more.',
  },
  customizeTitle: {
    id: `${scope}.customizeTitle`,
    defaultMessage: 'Easy Customization',
  },
  customizeDescription: {
    id: `${scope}.customizeDescription`,
    defaultMessage:
      'Since this cms is build using popular frameworks like NestJS & ReactJS, you can easily customize it to your needs.',
  },
  deploymentTitle: {
    id: `${scope}.deploymentTitle`,
    defaultMessage: 'Easy Deployment',
  },
  deploymentDescription: {
    id: `${scope}.deploymentDescription`,
    defaultMessage:
      'This CMS can be easily deployed and used all details are in the documentation.',
  },
});
