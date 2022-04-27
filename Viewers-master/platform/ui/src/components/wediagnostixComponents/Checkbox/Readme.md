
Different type of checkboxes available

          <Checkbox
            id="Bilan dentaire"
            label="Bilan dentaire"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="Bilan dents de sagesses"
            label="Bilan dents de sagesses"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="Recherche de foyers infectieux"
            label="Recherche de foyers infectieux"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="Bilan orthodontique"
            label="Bilan orthodontique"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="checked"
            label="Checked"
            isChecked={true}
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="indeterminate"
            label="Indeterminate"
            indeterminate={true}
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="switch"
            label="Switch"
            type="switch"
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="hasError"
            label="Has error"
            hasError
            onChange={event => this.handleReasonChange(event)}
          />
          <Checkbox
            id="disabled"
            label="Disabled"
            disabled
            onChange={event => this.handleReasonChange(event)}