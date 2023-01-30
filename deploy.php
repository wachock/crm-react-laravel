<?php
namespace Deployer;

require 'recipe/laravel.php';
require 'contrib/npm.php';

// Config

set('repository', 'git@gitlab.n2rtechnologies.com:nurulhasan/broom-service.git');

add('shared_files', []);
add('shared_dirs', []);
add('writable_dirs', []);

// Hosts

host('')
    ->set('remote_user', 'root')
    ->set('deploy_path', '/var/www/broom-service');

// Hooks

task('deploy', [
    'deploy:prepare',
    'deploy:vendors',
    'artisan:storage:link',
    'artisan:view:cache',
    'artisan:config:cache',
    'artisan:migrate',
    'npm:install',
    'npm:run:prod',
    'deploy:publish',
]);

task('npm:run:prod', function () {
    cd('{{release_or_current_path}}');
    run('composer install');
    run('npm run prod');
});

after('deploy:failed', 'deploy:unlock');
