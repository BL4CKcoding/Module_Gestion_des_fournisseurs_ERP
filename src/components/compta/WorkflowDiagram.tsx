import { ArrowRight, FileText, CheckCircle, CreditCard, XCircle, HelpCircle } from 'lucide-react';

interface WorkflowDiagramProps {
  stats: {
    received: number;
    validated: number;
    paid: number;
    rejected: number;
  };
}

export function WorkflowDiagram({ stats }: WorkflowDiagramProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="mb-6 text-lg font-semibold text-card-foreground">
        Workflow Comptabilité (BPMN)
      </h3>
      
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {/* Step 1: Réception */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="rounded-xl bg-info/10 border-2 border-info p-4 mb-2">
            <FileText className="h-6 w-6 text-info" />
          </div>
          <span className="text-sm font-medium text-center">Réception<br/>Facture</span>
          <span className="text-xs text-muted-foreground mt-1">{stats.received} en cours</span>
        </div>

        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

        {/* Step 2: Contrôle */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="rounded-xl bg-warning/10 border-2 border-warning p-4 mb-2">
            <HelpCircle className="h-6 w-6 text-warning" />
          </div>
          <span className="text-sm font-medium text-center">Contrôle<br/>Conformité</span>
          <span className="text-xs text-muted-foreground mt-1">Conforme?</span>
        </div>

        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

        {/* Decision branches */}
        <div className="flex flex-col gap-4 min-w-[120px]">
          {/* Yes branch */}
          <div className="flex flex-col items-center">
            <div className="rounded-xl bg-success/10 border-2 border-success p-4 mb-2">
              <CheckCircle className="h-6 w-6 text-success" />
            </div>
            <span className="text-sm font-medium text-center">Validation<br/>Comptable</span>
            <span className="text-xs text-muted-foreground mt-1">{stats.validated} validées</span>
          </div>
        </div>

        <ArrowRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />

        {/* Step 4: Paiement */}
        <div className="flex flex-col items-center min-w-[120px]">
          <div className="rounded-xl bg-primary/10 border-2 border-primary p-4 mb-2">
            <CreditCard className="h-6 w-6 text-primary" />
          </div>
          <span className="text-sm font-medium text-center">Paiement</span>
          <span className="text-xs text-muted-foreground mt-1">{stats.paid} payées</span>
        </div>
      </div>

      {/* Rejection path */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-destructive/10 border-2 border-destructive p-3">
            <XCircle className="h-5 w-5 text-destructive" />
          </div>
          <div>
            <span className="text-sm font-medium">Rejet Facture</span>
            <p className="text-xs text-muted-foreground">Si non conforme: {stats.rejected} rejetées</p>
          </div>
        </div>
      </div>
    </div>
  );
}
