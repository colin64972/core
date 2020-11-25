import {
  ANY_BUT_SPACES,
  DETICTION_LIMIT_TRIGGER,
  EMAIL_ADDRESS,
  EXCEL_CELL_ADDRESS
} from '@cjo3/shared/raw/constants/regex'
import * as Yup from 'yup'
import { schemaErrors, transformFunctionValues } from '../../constants'
import { TransformSettings } from '../../store/converter/interfaces'

export const TransformSettingsSchema: Yup.ObjectSchema<TransformSettings> = Yup.object().shape(
  {
    rangeStart: Yup.string().matches(
      EXCEL_CELL_ADDRESS,
      schemaErrors.excelCellAddress
    ),
    rangeEnd: Yup.string().matches(
      EXCEL_CELL_ADDRESS,
      schemaErrors.excelCellAddress
    ),
    ulTrigger: Yup.string()
      .matches(DETICTION_LIMIT_TRIGGER, schemaErrors.detectionLimitTrigger)
      .required(schemaErrors.required),
    ulTransform: Yup.mixed()
      .oneOf(Object.values(transformFunctionValues))
      .required(schemaErrors.required),
    ulTriggerZero: Yup.string().matches(
      ANY_BUT_SPACES,
      schemaErrors.anyButSpaces
    ),
    olTrigger: Yup.string()
      .matches(DETICTION_LIMIT_TRIGGER, schemaErrors.detectionLimitTrigger)
      .required(schemaErrors.required),
    olTransform: Yup.mixed()
      .oneOf(Object.values(transformFunctionValues))
      .required(schemaErrors.required)
  }
)

export const PaymentFormSchema: Yup.ObjectSchema = Yup.object().shape({
  billingEmail: Yup.string().matches(
    EMAIL_ADDRESS,
    schemaErrors.invalidEmailAddress
  ),
  acceptTerms: Yup.boolean().required(schemaErrors.required)
})
