import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 14,
          background: 'linear-gradient(to bottom right, #0f172a, #312e81)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          borderRadius: '50%',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          fontWeight: 700,
          letterSpacing: '1px',
        }}
      >
        AR
      </div>
    ),
    {
      ...size,
    }
  );
}
