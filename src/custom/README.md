# Custom Timeline Editor Module

This is a standalone module containing the complete functionality of the react-timeline-editor library. You can copy this entire `custom` folder into your project and use it directly without installing the NPM package.

## Installation

1. Copy the entire `custom` folder into your project's `src` directory
2. Install the required dependencies. You can either:

   **Option A: Install dependencies manually**
   ```bash
   npm install react-virtualized interactjs framework-utils
   # or
   yarn add react-virtualized interactjs framework-utils
   ```

   Also install the type definitions if using TypeScript:
   ```bash
   npm install --save-dev @types/react-virtualized @interactjs/types
   # or
   yarn add -D @types/react-virtualized @interactjs/types
   ```

   **Option B: Use the included package.json**
   ```bash
   # Navigate to the custom folder and install dependencies
   cd src/custom
   npm install
   # or
   yarn install
   ```

## Usage

Import the components from the custom module:

```tsx
import { Timeline, TimelineEngine } from './custom';
// or import specific components
import { Timeline } from './custom/components/timeline';
import { TimelineEngine } from './custom/engine/engine';
```

### Basic Example

```tsx
import React, { useRef } from 'react';
import { Timeline, TimelineRow, TimelineEffect, TimelineAction } from './custom';

const MyTimelineEditor = () => {
  const timelineState = useRef(null);

  const mockData: TimelineRow[] = [
    {
      id: '0',
      actions: [
        {
          id: 'action0',
          start: 0,
          end: 2,
          effectId: 'effect0',
        },
      ],
    },
  ];

  const mockEffect: Record<string, TimelineEffect> = {
    effect0: {
      id: 'effect0',
      name: 'effect0',
    },
  };

  return (
    <Timeline
      ref={timelineState}
      editorData={mockData}
      effects={mockEffect}
      onChange={(data) => {
        console.log('Timeline data changed:', data);
        return true;
      }}
      style={{ width: '100%', height: 600 }}
    />
  );
};
```

### Advanced Usage with Engine

```tsx
import React, { useRef, useEffect } from 'react';
import { Timeline, TimelineEngine } from './custom';

const MyAdvancedTimeline = () => {
  const timelineState = useRef(null);
  const engine = useRef(new TimelineEngine());

  useEffect(() => {
    // Access engine methods
    const engineInstance = engine.current;
    
    // Listen to engine events
    engineInstance.on('play', () => console.log('Playing'));
    engineInstance.on('paused', () => console.log('Paused'));
    engineInstance.on('ended', () => console.log('Ended'));
  }, []);

  const handlePlay = () => {
    timelineState.current?.play({ autoEnd: true });
  };

  const handlePause = () => {
    timelineState.current?.pause();
  };

  return (
    <>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <Timeline
        ref={timelineState}
        engine={engine.current}
        // ... other props
      />
    </>
  );
};
```

## Module Structure

```
custom/
├── index.ts              # Main entry point
├── components/           # React components
│   ├── timeline.tsx      # Main Timeline component
│   ├── cursor/          # Cursor component
│   ├── edit_area/       # Edit area components
│   ├── row_rnd/         # Row drag and resize
│   └── time_area/       # Time scale area
├── engine/              # Timeline engine (player)
│   ├── engine.ts        # Main engine class
│   ├── emitter.ts       # Event emitter
│   └── events.ts        # Event types
├── interface/           # TypeScript interfaces
│   ├── action.ts        # Action types
│   ├── timeline.ts      # Timeline types
│   ├── effect.ts        # Effect types
│   └── const.ts         # Constants
└── utils/               # Utility functions
```

## Key Components and Types

### Timeline Component
The main component that renders the timeline editor.

### TimelineEngine
The engine that handles playback, time control, and effect execution.

### Key Interfaces:
- `TimelineRow`: Represents a row in the timeline
- `TimelineAction`: Represents an action/clip in the timeline
- `TimelineEffect`: Represents an effect that can be applied to actions
- `TimelineState`: The ref interface for controlling the timeline

## Customization

The timeline editor supports extensive customization through props:
- Custom row heights
- Scale customization
- Drag and resize callbacks
- Custom styling
- Auto-scroll behavior
- Grid snapping
- And more...

Refer to the TypeScript interfaces in `interface/timeline.ts` for all available props and their descriptions. 