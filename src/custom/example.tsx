import React, { useRef } from 'react';
import { Timeline, TimelineRow, TimelineEffect, TimelineAction, TimelineState } from './index';

// Example component showing how to use the custom timeline editor
export const TimelineExample = () => {
  const timelineState = useRef<TimelineState>(null);

  // Sample data for the timeline
  const mockData: TimelineRow[] = [
    {
      id: 'row-1',
      rowHeight: 60,
      actions: [
        {
          id: 'action-1',
          start: 0,
          end: 3,
          effectId: 'effect-1',
        },
        {
          id: 'action-2',
          start: 4,
          end: 7,
          effectId: 'effect-2',
        },
      ],
    },
    {
      id: 'row-2',
      actions: [
        {
          id: 'action-3',
          start: 2,
          end: 5,
          effectId: 'effect-1',
        },
      ],
    },
  ];

  // Effects configuration
  const mockEffects: Record<string, TimelineEffect> = {
    'effect-1': {
      id: 'effect-1',
      name: 'Video Effect',
      source: {
        enter: ({ action, time }) => {
          console.log(`Effect ${action.effectId} entered at time ${time}`);
        },
        leave: ({ action, time }) => {
          console.log(`Effect ${action.effectId} left at time ${time}`);
        },
        update: ({ action, time }) => {
          // Called on each frame during playback
          // console.log(`Updating ${action.id} at time ${time}`);
        },
      },
    },
    'effect-2': {
      id: 'effect-2',
      name: 'Audio Effect',
    },
  };

  // Control handlers
  const handlePlay = () => {
    timelineState.current?.play({ autoEnd: true });
  };

  const handlePause = () => {
    timelineState.current?.pause();
  };

  const handleSetTime = (time: number) => {
    timelineState.current?.setTime(time);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Control buttons */}
      <div style={{ padding: '10px', display: 'flex', gap: '10px' }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause}>Pause</button>
        <button onClick={() => handleSetTime(0)}>Reset</button>
        <button onClick={() => handleSetTime(5)}>Go to 5s</button>
      </div>

      {/* Timeline editor */}
      <div style={{ flex: 1 }}>
        <Timeline
          ref={timelineState}
          editorData={mockData}
          effects={mockEffects}
          onChange={(data) => {
            console.log('Timeline data changed:', data);
            // You can update your state here
            return true; // Return false to reject the change
          }}
          onActionMoveEnd={(data) => {
            console.log('Action moved:', data);
          }}
          onActionResizeEnd={(data) => {
            console.log('Action resized:', data);
          }}
          // Customization options
          scale={1}
          scaleWidth={100}
          rowHeight={50}
          autoScroll={true}
          dragLine={true}
          // Style
          style={{ 
            width: '100%', 
            height: '100%',
            border: '1px solid #ccc'
          }}
        />
      </div>
    </div>
  );
}; 