# Personal Portfolio

> This portfolio demonstrates my understanding of React.js and my
> familiarity with Three.js through the development of an interactive 3D
> web application. The project showcases core React concepts such as
> component composition, state management, hooks (`useState`,
> `useEffect`, `useRef`, and custom hooks), reusable components,
> responsive layouts, and modern frontend development practices while
> integrating real-time 3D rendering using React Three Fiber.

## Introduction

This portfolio is designed as an interactive virtual workstation rather
than a traditional scrolling website. Upon entering the application,
visitors are placed inside a fully modeled 3D workspace where they can
explore my portfolio through natural interactions with the environment.

The experience begins with an animated camera sequence that introduces
the workstation before transitioning into an interactive scene. Users
can freely inspect the workspace, hover over objects, and focus on the
computer monitor to access the desktop interface. The monitor functions
as the primary navigation system, presenting an Apple-inspired desktop
environment where applications can be opened to explore different
sections of the portfolio.

Through this interface, visitors can learn about my background, view
software engineering projects, review technical skills, browse
certifications and education, and access my resume and contact
information. By combining traditional web development with real-time 3D
graphics, the portfolio aims to create an engaging and memorable
experience while demonstrating modern frontend engineering techniques.

------------------------------------------------------------------------

# Architecture

## High-Level Architecture

``` text
Personal Portfolio
│
├── 3D Workstation Layer
│   ├── React Three Fiber
│   ├── Three.js Scene
│   ├── Camera Controller
│   ├── Lighting
│   ├── GLTF Workstation Model
│   └── HTML Monitor Overlay
│
├── Desktop Environment
│   ├── Menu Bar
│   ├── Desktop
│   ├── Dock
│   └── Window Manager
│
├── Simulated Operating System
│   ├── Application Registry
│   ├── Window Stack
│   ├── Tab Manager
│   ├── Active Application Manager
│   └── Reducer
│
└── React State Layer
    ├── Context
    ├── useReducer
    ├── Custom Hooks
    └── TypeScript Interfaces
```

## Component Hierarchy

``` text
<App>
│
├── Canvas
│   ├── Workstation
│   ├── Camera
│   ├── Lighting
│   └── Monitor
│       └── Html
│           └── Desktop
│
└── WindowControlContextProvider
    ├── MenuBar
    ├── Dock
    ├── Desktop Icons
    └── Window Manager
        ├── Finder
        ├── Chrome
        ├── Preview
        └── Future Applications
```

## State Management

``` text
WindowControlContextProvider
│
├── runningApplication[]
├── openAppWindow : Map<string, WindowState>
├── dispatch()
│
├── openApplication()
├── closeWindow()
├── moveWindowToFront()
├── openNewTab()
├── deleteTab()
├── switchTab()
└── getActiveContext()
```

## Window Stack

The application uses a JavaScript `Map` as a stack. The last inserted
window represents the foreground window.

``` text
Bottom

Finder
Chrome
Resume
Portfolio

Top (Foreground)
```

Selecting a background window removes it from the map and reinserts it
at the end, bringing it to the front without manually tracking
`z-index`.

## Window Creation Flow

``` text
User
 │
 ▼
Application Click
 │
 ▼
canCreateWindow()
 │
 ▼
openApplication()
 │
 ▼
dispatch(CREATE_WINDOW)
 │
 ▼
Reducer
 │
 ▼
Create WindowState
 │
 ▼
Push Window onto Stack
 │
 ▼
React Re-render
```

## Finder

Finder acts as the application launcher.

``` text
Finder
│
├── Applications
├── Documents
├── Downloads
└── Other Locations

Applications
│
├── Build SystemApplication list
├── Filter hidden apps
├── Display icons
└── Double-click to launch
```

## Technologies

-   React
-   TypeScript
-   React Three Fiber
-   Three.js
-   Tailwind CSS
-   Context API
-   useReducer
-   Vite