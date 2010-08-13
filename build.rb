#!/usr/bin/env ruby

require 'rubygems'
require 'crxmake'

CrxMake.make(
  :ex_dir => "./src",
  :pkey   => "./hiveminder-local-timetrack-for-chrome.pem",
  :crx_output => "./hiveminder-local-timetrack-for-chrome.crx",
  :verbose => true,
  :ignorefile => /\.swp/,
  :ignoredir => /\.(?:svn|git|cvs)/
)

