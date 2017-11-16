import * as React from 'react'
import * as Redux from 'redux'
import {connect} from 'react-redux'

import NewOrgForm from '../../../stories/Organizations/New'
import * as organization from '../../../redux/reducers/organization'

type TCreateOrganizationAction = (
  orgName: string
) => (
  dispatch: Redux.Dispatch<organization.ActionTypeKeys.CREATE>
) => organization.TCreate

type TProps = {
  organization: organization.TState
  create: TCreateOrganizationAction
}

const OrgExists = (props: {orgId: string}) => (
  <div>
    <p>You're already part of an organization. :)</p>
    <p>
      Redirect to it <a href={props.orgId}>here</a> (TODO)
    </p>
  </div>
)

const CreateOrganization = (props: TProps) => {
  if (props.organization.name) {
    return <OrgExists orgId="#" />
  }
  return (
    <NewOrgForm
      onSubmit={formContents => {
        props.create(formContents.businessName.value)
      }}
    />
  )
}

type TPartialGlobalState = {organization: organization.TState}

const mapStateToProps = (state: TPartialGlobalState) => ({
  organization: state.organization,
})

const mapDispatchToProps = (dispatch: Redux.Dispatch<Redux.Action>) =>
  Redux.bindActionCreators({create: organization.actions.create}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CreateOrganization)
