import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Docker Workshop',
  description: '手把手帶領大家入門 Docker 世界',
  base: '/docker-workshop/',
  srcDir: '.',
  outDir: 'dist',

  themeConfig: {
    sidebar: [
      {
        text: 'Docker Basic Exercises Part 1',
        items: [
          { text: 'Hello Docker', link: '/docs/exercises/exercises-01-hello-docker' },
          { text: 'Understand Docker Run', link: '/docs/exercises/exercises-02-understand-docker-run' },
          { text: 'Port forwarding', link: '/docs/exercises/exercises-03-port-forwarding' },
          { text: 'Run Command', link: '/docs/exercises/exercises-04-run-command' },
          { text: 'Volume Mapping', link: '/docs/exercises/exercises-05-volume-mapping' },
          { text: 'Using Docker Instead Install Tools', link: '/docs/exercises/exercises-06-using-docker-instead-install-tools' },
        ],
      },
      {
        text: 'Docker Basic Exercises Part 2',
        items: [
          { text: 'Environment Variable', link: '/docs/exercises/exercises-11-environment-variable' },
          { text: 'Link Container', link: '/docs/exercises/exercises-12-link-container' },
          { text: 'Persistent Image', link: '/docs/exercises/exercises-13-persistent-image' },
          { text: 'Persistent Container filesystem', link: '/docs/exercises/exercises-14-persistent-container-filesystem' },
          { text: 'Volume Advanced', link: '/docs/exercises/exercises-15-volume-advanced' },
          { text: 'Backup Database', link: '/docs/exercises/exercises-16-backup-database' },
        ],
      },
      {
        text: 'Docker Build Exercises',
        items: [
          { text: 'Docker Build', link: '/docs/exercises/exercises-21-docker-build' },
          { text: 'Optimizing Dockerfile', link: '/docs/exercises/exercises-22-optimizing-dockerfile' },
          { text: 'Multi-stage Build', link: '/docs/exercises/exercises-23-multi-stage-build' },
        ],
      },
      {
        text: 'Docker Compose',
        items: [
          { text: 'Docker Compose', link: '/docs/exercises/exercises-31-docker-compose' },
        ],
      },
      { text: '常見指令速查表', link: '/docs/command-tricks' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/104corp/docker-workshop' },
    ],

    editLink: {
      pattern: 'https://github.com/104corp/docker-workshop/edit/master/:path',
      text: '編輯這個頁面',
    },
  },
})
