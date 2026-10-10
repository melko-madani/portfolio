import type { VisualKind } from '../../content/types'
import { useContent } from '../../lib/locale'
import { BtpExtractVisual } from './BtpExtractVisual'
import { MpMarocVisual } from './MpMarocVisual'
import { StreamingPipelineVisual } from './StreamingPipelineVisual'
import { TalentOrchestratorVisual } from './TalentOrchestratorVisual'

/**
 * Hand-built visuals drawn in the site's own design language. Replace a
 * branch with a real screenshot (<img>) once one can be published.
 */
export function ProjectVisual({ kind }: { kind: VisualKind }) {
  const { visuals } = useContent().ui
  switch (kind) {
    case 'btpextract':
      return <BtpExtractVisual />
    case 'mp-maroc':
      return <MpMarocVisual />
    case 'streaming-pipeline':
      return <StreamingPipelineVisual t={visuals.streaming} />
    case 'talent-orchestrator':
      return <TalentOrchestratorVisual t={visuals.talent} />
  }
}
