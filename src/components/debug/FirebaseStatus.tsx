import { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';

export default function FirebaseStatus() {
  const [status, setStatus] = useState<{
    auth: boolean;
    db: boolean;
    config: any;
  }>({
    auth: false,
    db: false,
    config: null,
  });

  useEffect(() => {
    // Firebase Auth 체크
    const authCheck = !!auth;
    
    // Firestore 체크
    const dbCheck = !!db;

    // Firebase Config 체크
    const config = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY?.substring(0, 10) + '...',
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    };

    setStatus({
      auth: authCheck,
      db: dbCheck,
      config,
    });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-md rounded-lg p-4 shadow-xl z-50 text-xs font-mono max-w-sm">
      <h3 className="font-bold text-sm mb-2 text-text-choco">🔥 Firebase Status</h3>
      
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span>{status.auth ? '✅' : '❌'}</span>
          <span>Auth: {status.auth ? 'Connected' : 'Failed'}</span>
        </div>
        
        <div className="flex items-center gap-2">
          <span>{status.db ? '✅' : '❌'}</span>
          <span>Firestore: {status.db ? 'Connected' : 'Failed'}</span>
        </div>

        <hr className="my-2" />

        <div className="text-text-rosegray">
          <div><strong>API Key:</strong> {status.config?.apiKey || '❌ Not Set'}</div>
          <div><strong>Auth Domain:</strong> {status.config?.authDomain || '❌ Not Set'}</div>
          <div><strong>Project ID:</strong> {status.config?.projectId || '❌ Not Set'}</div>
        </div>

        {!status.auth && (
          <div className="mt-2 p-2 bg-red-50 rounded text-red-600 text-xs">
            ⚠️ Firebase 설정이 필요합니다!
          </div>
        )}
      </div>
    </div>
  );
}


