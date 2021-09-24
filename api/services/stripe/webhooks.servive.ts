import { Request, Response } from 'express';
import logger from '~/utils/logger';
import { invoicePaymentFailed, invoicePaymentSuccess, trialWillEnd } from '../user/plans-user.service';

async function webhookStripe(req: Request, res: Response): Promise<void> {
  let event;
  try {
    event = JSON.parse(req.body);
  } catch (err) {
    logger.error(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'invoice.payment_succeeded':
      invoicePaymentSuccess(event.data.object);
      break;
    case 'invoice.payment_failed':
      invoicePaymentFailed(event.data.object);
      break;
    case 'customer.subscription.trial_will_end':
      trialWillEnd(event.data.object);
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({ received: true });
}

export default webhookStripe;
