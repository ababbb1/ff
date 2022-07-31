import { useState } from 'react';
import { RoleInfo } from '../../../../libs/types/game';
import HintCharacters from './hint-characters';
import HintInfoContent from './hint-info-content';
import HintInfoLayout from './hint-info-layout';
import HintOverview from './hint-overview';

type PreviewContentNameType = 'overview' | 'characters';
export interface PreviewContentType {
  name: PreviewContentNameType;
  index: number;
}

export default function HintInfoPreview() {
  const [content, setContent] = useState<PreviewContentType>({
    name: 'overview',
    index: 0,
  });

  return (
    <HintInfoLayout
      title={content.name === 'overview' ? '사건개요' : '등장인물'}
      closeButon={false}
    >
      {content.name === 'overview' && (
        <HintOverview setContent={setContent} savedIndex={content.index} />
      )}
      {content.name === 'characters' && (
        <HintCharacters setContent={setContent} savedIndex={content.index} />
      )}
    </HintInfoLayout>
  );
}
