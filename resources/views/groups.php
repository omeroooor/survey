<md-content  flex layout-padding>

	<div layout="column" layout-align="top center">
		<md-nav-bar
		  md-no-ink-bar="disableInkBar"
		  md-selected-nav-item="currentNavItem"
		  nav-bar-aria-label="navigation links">
		  <md-nav-item md-nav-click="goto('page1')" name="page1">
			Page One
		  </md-nav-item>
		  <br>
		  <md-nav-item md-nav-click="goto('page2')" name="page2" ng-disabled="secondTabDisabled">
			Page Two
		  </md-nav-item>
		  <br>
		  <md-nav-item md-nav-click="goto('page3')" name="page3">
			Page Three
		  </md-nav-item>
		  <br>
		  <md-nav-item md-nav-click="goto('page4')" name="page4" disabled>
			Page Four
		  </md-nav-item>
		</md-nav-bar>
		<span>{{status}}</span>
		<div class="ext-content">
		  External content for `<span>{{currentNavItem}}</span>`.
		</div>	
	</div>
	
</md-content>