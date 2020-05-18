/* eslint-env node */
'use strict';

module.exports = function(deployTarget) {
  //see https://github.com/ember-cli-deploy/ember-cli-deploy-revision-data/issues/52
  process.env.GIT_DISCOVERY_ACROSS_FILESYSTEM=1;
  let ENV = {
    build: {
      environment: 'development'
    },
    'ssh-index': { // copy and deploy index.html
      username: 'root',
      host: 'relance.s.redpencil.io',
      port: 22,
      // remoteDir:
      allowOverwrite: true,
      agent: process.env.SSH_AUTH_SOCK
    },
    'rsync': { // copy assets
      host: 'root@relance.s.redpencil.io',
      port: 22,
      // dest: '/data/app-toevla-dev/toevla-app',
      delete: false,
      arg:['--verbose']
    }
  };

  if (deployTarget === 'development' || deployTarget === 'dev') {
    ENV['ssh-index']["remoteDir"] = "/data/app-relance/config/frontend-relance-dev/";
    ENV['rsync']['dest'] = ENV['ssh-index']['remoteDir'];
  }

  if (deployTarget === 'staging' || deployTarget === 'qa') {
    ENV['ssh-index']["remoteDir"] = "/data/app-relance/config/frontend-relance-qa/";
    ENV['rsync']['dest'] = ENV['ssh-index']['remoteDir'];
  }

  if (deployTarget === 'style') {
    ENV['ssh-index']["remoteDir"] = "/data/app-relance/config/frontend-relance-style/";
    ENV['rsync']['dest'] = ENV['ssh-index']['remoteDir'];
  }

  if (deployTarget === 'production') {
    ENV.build.environment = "production";
    ENV['ssh-index']["remoteDir"] = "/data/app-relance/config/frontend-relance/";
    ENV['rsync']['dest'] = ENV['ssh-index']['remoteDir'];
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
