// This file is managed by a centralized-boilerplate package

import * as child from 'child_process'
import * as gulp from 'gulp'

gulp.task('boil', boil)
gulp.task('build', build)
gulp.task('lint', lint)
gulp.task('test', test)
gulp.task('e2e', e2e)

async function boil (): Promise<void> {
  await execute('node ./node_modules/centralized-boilerplate.package/bin/run.js')
}

async function build (): Promise<void> {
  await execute('rm -rf dist')
  await execute('tsc')
}

async function lint (): Promise<void> {
  await execute('ts-standard --project ./tsconfig.json')
}

async function test (): Promise<void> {
  await build()
  await execute('jasmine dist/src/**/*.spec.js')
}

async function e2e (): Promise<void> {
  await build()
  await execute('jasmine dist/e2e/**/*.e2e-spec.js')
}

export async function execute (
  command: string,
  options?: {
    cwd: string
  }
): Promise<void> {
  process.stdout.write(`executing... "${command}"\n`)
  await run(command, options)
  process.stdout.write(`finished... "${command}"\n`)
}

async function run (
  command: string,
  options?: {
    cwd: string
  }
): Promise<void> {
  return await new Promise((resolve, reject) => {
    const stream = child.exec(command, options, (error) => {
      if (error !== null) {
        return reject(error)
      }
      resolve()
    })

    if (stream.stdout !== null) {
      stream.stdout.pipe(process.stdout)
    }

    if (stream.stderr !== null) {
      stream.stderr.pipe(process.stderr)
    }
  })
}
