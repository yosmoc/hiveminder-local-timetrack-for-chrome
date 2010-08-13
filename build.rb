#!/usr/bin/env ruby

require 'rubygems'
require 'crxmake'

CrxMake.make(
  :ex_dir => "./src",
  :pkey   => "./hiveminder-local-timetrack-for-chrome.pem",
  :crx_output => "./hiveminder-local-timetrack-for-chrome.crx",
  :verbose => true,
  :ignoredir => /\.(?:svn|git|cvs)/
)

# create zip for Google Extension Gallery
CrxMake.zip(
  :ex_dir => "./src",
  :pkey   => "./hiveminder-local-timetrack-for-chrome.pem",
  :zip_output => "./hiveminder-local-timetrack-for-chrome.zip",
  :verbose => true,
  :ignoredir => /\.(?:svn|git|cvs)/
)
