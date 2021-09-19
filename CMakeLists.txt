cmake_minimum_required(VERSION 3.20)
project(my_algorithms)

set(CMAKE_CXX_STANDARD 11)

include_directories(003-practice-cpp)

add_executable(my_algorithms
        003-practice-cpp/001-hello-world.cpp)
